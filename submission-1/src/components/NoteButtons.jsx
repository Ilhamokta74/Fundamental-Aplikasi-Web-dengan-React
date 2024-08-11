import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NoteButton({ id, archived, archiveHandler, deleteHandler }) {
  return (
    <section className="note-item__action">
      <button type="button" className="note-item__detail-button">
        <Link to={`/detail/${id}`} className="note-item__link">
          Detail
        </Link>
      </button>
      <button
        type="button"
        onClick={archiveHandler}
        className="note-item__archive-button"
        aria-label={archived ? "Unarchive note" : "Archive note"}
      >
        {archived ? "Batalkan" : "Arsipkan"}
      </button>
      <button
        type="button"
        onClick={deleteHandler}
        className="note-item__delete-button"
        aria-label="Delete note"
      >
        Hapus
      </button>
    </section>
  );
}

NoteButton.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  archiveHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default NoteButton;
