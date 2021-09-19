// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const speech = require('@google-cloud/speech').v1p1beta1;
const language = require('@google-cloud/language');

const path = require('path');
const os = require('os');
const fs = require('fs');
 
// Node.js doesn't have a built-in multipart/form-data parsing library.
// Instead, we can use the 'busboy' library from NPM to parse these requests.
const Busboy = require('busboy');

 /**
 * Parses a 'multipart/form-data' upload request
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.audio = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    // Return a "method not allowed" error
    return res.status(405).end();
  }
  const busboy = new Busboy({headers: req.headers});
  const tmpdir = os.tmpdir();

  // This object will accumulate all the fields, keyed by their name
  const fields = {};

  // This object will accumulate all the uploaded files, keyed by their name.
  const uploads = {};

  // This code will process each non-file field in the form.
  busboy.on('field', (fieldname, val) => {
    /**
    *  TODO(developer): Process submitted field values here
    */
    console.log(`Processed field ${fieldname}: ${val}.`);
    fields[fieldname] = val;
  });

  const fileWrites = [];

  // This code will process each file uploaded.
  busboy.on('file', (fieldname, file, filename) => {
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    console.log(`Processed file ${filename}`);
    const filepath = path.join(tmpdir, filename);
    uploads[fieldname] = filepath;

    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);

    // File was processed by Busboy; wait for it to be written.
    // Note: GCF may not persist saved files across invocations.
    // Persistent files must be kept in other locations
    // (such as Cloud Storage buckets).
    const promise = new Promise((resolve, reject) => {
      file.on('end', () => {
        writeStream.end();
      });
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
    fileWrites.push(promise);
  });

  // Triggered once all uploaded files are processed by Busboy.
  // We still need to wait for the disk writes (saves) to complete.
  busboy.on('finish', async () => {
    await Promise.all(fileWrites);

    for (const file in uploads) {
      process({
        content: fs.readFileSync(uploads[file]).toString('base64')
      }, fields.encoding);
      fs.unlinkSync(uploads[file]);
    }
    res.send();
  });

  busboy.end(req.rawBody);
});

async function analyze(text) {
  
  // Instantiates a client
  const client = new language.LanguageServiceClient();

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({document: document});
  const {score, magnitude} = result.documentSentiment;

  return {
    score,
    magnitude
  }
}

async function process(audio, encoding) {
  
  // Creates a client
  const client = new speech.SpeechClient();

  const config = {
    encoding,
    sampleRateHertz: 16000,
    languageCode: 'en-US',
    enableSpeakerDiarization: true,
    diarizationSpeakerCount: 2,
    useEnhanced: true,
    enableAutomaticPunctuation: true,
    model: 'video',
    metadata: {
      interactionType: "discussion"
    }
  };

  const request = {
    config: config,
    audio: audio,
  };

  const [response] = await client.recognize(request);
  console.log(response);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
  console.log('Speaker Diarization:');
  const result = response.results[response.results.length - 1];
  console.log(result)

  const wordsInfo = result.alternatives[0].words;
  // Note: The transcript within each result is separate and sequential per result.
  // However, the words list within an alternative includes all the words
  // from all the results thus far. Thus, to get all the words with speaker
  // tags, you only have to take the words list from the last result:
  let currSpeaker = wordsInfo[0].speakerTag;
  const blocks = [];
  let prevWord = "";
  let currentBlock = "";
  const content = {
    1: "",
    2: ""
  }
  const punctuation = /[.?]/;
  for (const a of wordsInfo) {
    if (a.speakerTag === currSpeaker || (punctuation.test(a.word) && !punctuation.test(prevWord))) {
      currentBlock += a.word + " ";
    }
    else {
      blocks.push({[currSpeaker]: currentBlock});
      currentBlock = a.word + " ";
      currSpeaker = a.speakerTag;
    }
    content[a.speakerTag] += a.word + " ";
    prevWord = a.word;
  }
  blocks.push({[currSpeaker]: currentBlock});
  console.log(blocks);
  const data = {}
  Promise.all(Object.keys(content).map(async key => {
    data[key] = analyze(content[key]);
    return data[key];
  }))
    .then(() => {
      console.log(data);

      let upset;
      if (-0.1 < data['1'].score < 0.1 && -0.1 < data['2'].score < 0.1) {
        upset = data['1'].magnitude > data['2'].magnitude ? 1 : 2;
      }
      else {
        upset = data['1'].score > data['2'].score ? 1 : 2;
      }
      console.log("Upset: " + upset);
      const started = Object.keys(blocks[0])[0];
      console.log("Started: " + started);
    });
}
