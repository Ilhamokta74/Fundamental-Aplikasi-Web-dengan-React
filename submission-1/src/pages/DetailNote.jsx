import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getNote } from "../utils/local-data";
import { showFormattedDate } from "../utils";

function DetailNoteWrapper() {
  const { id } = useParams();
  return <DetailNote id={id} />;
}

class DetailNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getNote(props.id) || {}, // Ensure we have an object to avoid errors
    };
  }

  componentDidUpdate(prevProps) {
    // Fetch new note data if the id prop changes
    if (this.props.id !== prevProps.id) {
      this.setState({
        notes: getNote(this.props.id) || {},
      });
    }
  }

  render() {
    const { title, createdAt, body } = this.state.notes;
    return (
      <div className="detail-page">
        <p className="detail-page__title">{title}</p>
        <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
        <p className="detail-page__body">{body}</p>
      </div>
    );
  }
}

DetailNote.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailNoteWrapper;
