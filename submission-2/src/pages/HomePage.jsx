import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import NotesButton from '../components/NotesButton';
import Loading from '../components/Loading';
import LocaleContext from '../contexts/LocaleContext';
import { getActiveNotes } from '../utils/network-data';

const HomePage = () => {
  const navigate = useNavigate();
  const { selectLanguage } = React.useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [keyword, setKeyword] = React.useState(() => searchParams.get('keyword') || '');

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  const addButtonHandler = () => {
    navigate('/notes/add');
  };

  const keywordChangeHandler = (newKeyword) => {
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  const filteredNotes = notes
    .filter(({ title }) => title.toLowerCase().includes(keyword.toLowerCase()));

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="homepage">
      <h2>{selectLanguage({ en: 'Active Notes', id: 'Catatan Aktif' })}</h2>
      <SearchBar keyword={keyword} keywordChange={keywordChangeHandler} />
      <NotesList notes={filteredNotes} />
      <div className="homepage__action">
        <NotesButton
          className='action action__submit-note'
          title={selectLanguage({ en: 'Add Note', id: 'Tambah Catatan' })}
          onClick={addButtonHandler}
        />
      </div>
    </section>
  );
};

export default HomePage;
