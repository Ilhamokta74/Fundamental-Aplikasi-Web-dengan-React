import React from "react";
import PropTypes from "prop-types";

function NoteInput({ onChange, placeholder, type = "text", value, style }) {
	return type === "textarea" ? (
		<textarea
			className="add-new-page__input add-new-page__input__body"
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			style={style}
		/>
	) : (
		<input
			className="add-new-page__input add-new-page__input__title"
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			value={value}
		/>
	);
}

NoteInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	type: PropTypes.string,
	style: PropTypes.object,
};

export default NoteInput;
