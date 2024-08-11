import React from "react"
import PropTypes from "prop-types"

function NoteButton({ id, archived, archiveHandler, deleteHandler }) {
	return (
		<section className="note-item__action">
			<button
				type="button"
				onClick={archiveHandler}
				className="note-item__archive-button"
			>
				{archived ? "Batalkan" : "Arsipkan"}
			</button>
			<button
				type="button"
				onClick={deleteHandler}
				className="note-item__delete-button"
			>
				Hapus
			</button>
		</section>
	)
}

NoteButton.propTypes = {
	id: PropTypes.string.isRequired,
	archived: PropTypes.bool.isRequired,
	archiveHandler: PropTypes.func.isRequired,
	deleteHandler: PropTypes.func.isRequired,
}

export default NoteButton
