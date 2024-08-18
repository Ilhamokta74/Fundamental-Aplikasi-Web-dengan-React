import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotesInput from '../components/NotesInput';
import NotesButton from '../components/NotesButton';
import LocaleContext from '../contexts/LocaleContext';
import { addNote } from '../utils/network-data';

const AddPage = () => {
  const { selectLanguage } = React.useContext(LocaleContext);
  const navigate = useNavigate();
  const [newNote, setNewNote] = React.useState({
    title: '',
    body: '',
  });

  const titleChangeHandler = (event) => {
    setNewNote((prevNewNote) => ({
      ...prevNewNote,
      title: event.target.value,
    }));
  };

  const bodyChangeHandler = (event) => {
    setNewNote((prevNewNote) => ({
      ...prevNewNote,
      body: event.target.innerHTML,
    }));
  };

  const submitButtonHandler = async () => {
    await addNote(newNote);
    navigate('/');
  };

  return (
    <section className="add-new-page">
      <NotesInput
        state={newNote}
        onTitleChange={titleChangeHandler}
        onBodyChange={bodyChangeHandler}
      />
      <div className="add-new-page__action">
        <NotesButton
          className='action action__submit-note'
          title={selectLanguage({ en: 'Save Note', id: 'Simpan Catatan' })}
          onClick={submitButtonHandler}
        />
      </div>
    </section>
  );
};

export default AddPage;
