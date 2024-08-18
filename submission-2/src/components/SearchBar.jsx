import React from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

const SearchBar = ({ keyword, keywordChange }) => {
  const { selectLanguage } = React.useContext(LocaleContext);

  const keywordChangeHandler = (event) => {
    keywordChange(event.target.value);
  };

  return (
        <section className="search-bar">
            <input
                type="text"
                placeholder={selectLanguage(
                  { en: 'Search notes by title here....', id: 'Cari catatan berdasarkan judul di sini....' },
                )}
                value={keyword}
                onChange={keywordChangeHandler}
            />
        </section>
  );
};

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
