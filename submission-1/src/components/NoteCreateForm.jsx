import React, { useState } from "react";
import NoteInput from "./NoteInput";
import PropTypes from "prop-types";

function NoteCreateForm({ submitHandler }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (ev) => {
    const characterLimit = 50;
    if (ev.target.value.length <= characterLimit) {
      setTitle(ev.target.value);
    }
  };

  const handleBodyChange = (ev) => {
    setBody(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (title && body) {
      submitHandler({ title, body });
      setTitle("");
      setBody("");
    }
  };

  return (
    <div className="note-input">
      <h2 className="note-input__title">Buat catatan</h2>
      <p className="note-input__title__char-limit">
        Sisa karakter: <span>{50 - title.length}</span>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <NoteInput
            handler={handleTitleChange}
            placeholder="Tulis Judul Disini..."
            type="text"
            value={title}
          />
        </div>
        <div>
          <NoteInput
            handler={handleBodyChange}
            placeholder="Tulis Catatan Disini..."
            type="textarea"
            value={body}
            style={{ height: "200px" }}
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium p-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!title || !body}
          >
            Tambah Catatan
          </button>
        </div>
      </form>
    </div>
  );
}

NoteCreateForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};

export default NoteCreateForm;
