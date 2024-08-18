import React from 'react';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { showFormattedDate } from '../utils';

const NotesItem = ({ id, title, createdAt, body }) => {
  const { selectLanguage } = React.useContext(LocaleContext);

  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">
        {selectLanguage({ en: showFormattedDate(createdAt, 'en-ID'), id: showFormattedDate(createdAt, 'id-ID') })}
      </p>
      <p className="note-item__body">{parser(body)}</p>
    </article>
  );
};

NotesItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NotesItem;
