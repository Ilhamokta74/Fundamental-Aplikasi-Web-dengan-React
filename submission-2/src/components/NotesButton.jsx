import React from 'react';
import PropTypes from 'prop-types';

const NotesButton = ({ className, title, onClick, icon }) => (
        <button
            className={className}
            type="button"
            onClick={onClick}
        >
           <span>{title}</span>{icon}
        </button>
);

NotesButton.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
};

export default NotesButton;
