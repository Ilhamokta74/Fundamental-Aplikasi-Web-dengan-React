import React from "react";
import NoteItemContent from "./NoteItemContent";
import NoteButtons from "./NoteButtons";
import PropTypes from "prop-types";

function NoteItem({ note, archiveHandler, deleteHandler }) {
  return (
    <div className="note-item">
      <NoteItemContent
        title={note.title}
        body={note.body}
        createdAt={note.createdAt}
      />
      <NoteButtons
        id={note.id}
        archived={note.archived}
        archiveHandler={() => archiveHandler(note.id)}
        deleteHandler={() => deleteHandler(note.id)}
      />
    </div>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }).isRequired,
  archiveHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default NoteItem;
