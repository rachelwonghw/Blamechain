import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Searchbar.scss';

const Searchbar = () => {
  const [searchWords, setSearchWords] = useState('');

  return (
    <div className="searchbar">
      <FontAwesomeIcon icon={faSearch} />
      <input
        className="searchbar__input"
        type="text"
        placeholder="Search keywords"
        value={searchWords}
        onChange={(e) => {
          setSearchWords(e.target.value)
        }}
      />
    </div>
  );
}

export default Searchbar;