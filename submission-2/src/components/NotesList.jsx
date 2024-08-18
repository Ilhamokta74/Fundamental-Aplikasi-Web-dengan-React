import React from 'react';
import PropTypes from 'prop-types';
import { ImFilesEmpty } from 'react-icons/im';
import NotesItem from './NotesItem';
import LocaleContext from '../contexts/LocaleContext';

const NotesList = ({ notes }) => {
  const { selectLanguage } = React.useContext(LocaleContext);

  return (
    <>
      {
        notes.length ? (
          <section className='notes-list'>
            {
              notes.map((note) => (
                <NotesItem
                  key={note.id}
                  id={note.id}
                  {...note}
                />
              ))
            }
          </section>
        ) : (
          <section className="notes-list-empty">
            <ImFilesEmpty />
            <p>
              {selectLanguage({ en: 'No notes are displayed', id: 'Tidak ada catatan yang ditampilkan' })}
            </p>
          </section>
        )
      }
    </>
  );
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  })),
};

export default NotesList;
