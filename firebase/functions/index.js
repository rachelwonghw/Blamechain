const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

module.exports.uploadArgument = function() {
  // process audio file
  // possible formats
  // const audio = {
  //   uri: gcsUri,
  // };

  // const audio = {
  //   content: fs.readFileSync(fileName).toString('base64'),
  // };
  // analyze text

}

async function analyze(text) {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
}

async function process(audio) {
  // Imports the Google Cloud client library
  const speech = require('@google-cloud/speech').v1p1beta1;

  // Creates a client
  const client = new speech.SpeechClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const uri = path to GCS audio file e.g. `gs:/bucket/audio.wav`;

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 8000,
    languageCode: 'en-US',
    enableSpeakerDiarization: true,
    diarizationSpeakerCount: 2,
    model: 'phone_call',
  };

  const request = {
    config: config,
    audio: audio,
  };

  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
  console.log('Speaker Diarization:');
  const result = response.results[response.results.length - 1];
  const wordsInfo = result.alternatives[0].words;
  // Note: The transcript within each result is separate and sequential per result.
  // However, the words list within an alternative includes all the words
  // from all the results thus far. Thus, to get all the words with speaker
  // tags, you only have to take the words list from the last result:
  wordsInfo.forEach(a =>
    console.log(` word: ${a.word}, speakerTag: ${a.speakerTag}`)
  );
}
