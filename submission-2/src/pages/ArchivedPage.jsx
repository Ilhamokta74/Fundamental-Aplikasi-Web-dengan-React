import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import LocaleContext from '../contexts/LocaleContext';
import { getArchivedNotes } from '../utils/network-data';

const ArchivedPage = () => {
  const { selectLanguage } = React.useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [keyword, setKeyword] = React.useState(() => searchParams.get('keyword') || '');

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

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
      <h2>{selectLanguage({ en: 'Archived Notes', id: 'Catatan Terarsip' })}</h2>
      <SearchBar keyword={keyword} keywordChange={keywordChangeHandler} />
      <NotesList notes={filteredNotes} />
    </section>
  );
};

export default ArchivedPage;
