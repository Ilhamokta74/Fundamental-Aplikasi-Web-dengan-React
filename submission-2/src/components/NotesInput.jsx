import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import LocaleContext from '../contexts/LocaleContext';

const NotesInput = ({ state, onTitleChange, onBodyChange, initBodyEdit }) => {
  const { selectLanguage } = React.useContext(LocaleContext);

  return (
        <div className="add-new-page__input">
            <input
                className="add-new-page__input__title"
                type="text"
                value={state.title}
                onChange={onTitleChange}
                placeholder={selectLanguage({ en: 'Input title here....', id: 'Masukkan judul disini....' })}
                required
            />
            <div
                className="add-new-page__input__body"
                onInput={onBodyChange}
                data-placeholder={selectLanguage({ en: 'Write your notes here....', id: 'Tuliskan catatan anda disini....' })}
                contentEditable="true"
                suppressContentEditableWarning={true}
                aria-required="true"
            >
            {initBodyEdit !== undefined ? parser(initBodyEdit) : ''}
            </div>
        </div>
  );
};

NotesInput.propTypes = {
  state: PropTypes.object.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onBodyChange: PropTypes.func.isRequired,
  initBodyEdit: PropTypes.string,
};

export default NotesInput;
