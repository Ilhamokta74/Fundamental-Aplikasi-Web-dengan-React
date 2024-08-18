import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
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
  const [note, setNote] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
      setLoading(false);
    });
  }, [id]);

  const deleteButtonHandler = async () => {
    await deleteNote(id);
    return note.archived ? navigate('/archived') : navigate('/');
  };

  const archiveButtonHandler = async () => {
    await archiveNote(id);
    navigate('/');
  };

  const unarchiveButtonHandler = async () => {
    await unarchiveNote(id);
    navigate('/archived');
  };

  if (loading) {
    return <Loading />;
  }

  if (note === undefined || note === null) {
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
          icon={note.archived ? <BiArchiveOut /> : <BiArchiveIn />}
        />
        <NotesButton
          className='action action__warning-note'
          title={selectLanguage({ en: 'Delete', id: 'Hapus' })}
          onClick={deleteButtonHandler}
          icon={<FiTrash2 />}
        />
      </div>
    </section>
  );
};

export default DetailPage;
