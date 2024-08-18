import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NotesDetail from '../components/NotesDetail';
import NotesButton from '../components/NotesButton';
import NotFoundMessage from '../components/NotFoundMessage';
import Loading from '../components/Loading';
import LocaleContext from '../contexts/LocaleContext';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';

const DetailPage = () => {
  const { selectLanguage } = React.useContext(LocaleContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNote = async () => {
      const { error, data } = await getNote(id);
      if (!error) {
        setNote(data);
      } else {
        alert(
          selectLanguage({
            en: 'Failed to load note. Please try again later.',
            id: 'Gagal memuat catatan. Silakan coba lagi nanti.',
          })
        );
      }
      setLoading(false);
    };

    fetchNote();
  }, [id, selectLanguage]);

  const deleteButtonHandler = React.useCallback(async () => {
    const { error } = await deleteNote(id);
    if (!error) {
      return note.archived ? navigate('/archived') : navigate('/');
    } else {
      alert(
        selectLanguage({
          en: 'Failed to delete note. Please try again later.',
          id: 'Gagal menghapus catatan. Silakan coba lagi nanti.',
        })
      );
    }
  }, [id, navigate, note, selectLanguage]);

  const archiveButtonHandler = React.useCallback(async () => {
    const { error } = await archiveNote(id);
    if (!error) {
      navigate('/');
    } else {
      alert(
        selectLanguage({
          en: 'Failed to archive note. Please try again later.',
          id: 'Gagal mengarsipkan catatan. Silakan coba lagi nanti.',
        })
      );
    }
  }, [id, navigate, selectLanguage]);

  const unarchiveButtonHandler = React.useCallback(async () => {
    const { error } = await unarchiveNote(id);
    if (!error) {
      navigate('/archived');
    } else {
      alert(
        selectLanguage({
          en: 'Failed to unarchive note. Please try again later.',
          id: 'Gagal mengaktifkan catatan. Silakan coba lagi nanti.',
        })
      );
    }
  }, [id, navigate, selectLanguage]);

  if (loading) {
    return <Loading />;
  }

  if (!note) {
    return <NotFoundMessage />;
  }

  return (
    <section>
      <NotesDetail {...note} />
      <div className='detail-page__action'>
        <NotesButton
          className='action action__archive-note'
          title={note.archived ? selectLanguage({ en: 'Unarchive', id: 'Aktifkan' }) : selectLanguage({ en: 'Archive', id: 'Arsipkan' })}
          onClick={note.archived ? unarchiveButtonHandler : archiveButtonHandler}
        />
        <NotesButton
          className='action action__warning-note'
          title={selectLanguage({ en: 'Delete', id: 'Hapus' })}
          onClick={deleteButtonHandler}
        />
      </div>
    </section>
  );
};

export default DetailPage;
