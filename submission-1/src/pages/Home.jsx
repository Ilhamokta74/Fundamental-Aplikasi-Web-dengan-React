import React from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { archiveNote, deleteNote, getActiveNotes } from "../utils/local-data";

function HomePageWrapper() {
	const [searchParams, setSearchParams] = useSearchParams();
	const keyword = searchParams.get("keyword") || "";

	function changeSearchParams(keyword) {
		setSearchParams({ keyword });
	}

	return <Home defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: getActiveNotes(),
			keyword: props.defaultKeyword || "",
		};
		this.deleteNoteHandler = this.deleteNoteHandler.bind(this);
		this.archiveNoteHandler = this.archiveNoteHandler.bind(this);
		this.searchHandler = this.searchHandler.bind(this);
	}

	deleteNoteHandler(id) {
		deleteNote(id);
		this.setState({
			notes: getActiveNotes(),
		});
	}

	archiveNoteHandler(id) {
		archiveNote(id);
		this.setState({
			notes: getActiveNotes(),
		});
	}

	searchHandler(keyword) {
		this.setState({ keyword });
		this.props.keywordChange(keyword);
	}

	getFilteredNotes() {
		const { notes, keyword } = this.state;
		return notes.filter((note) =>
			note.title.toLowerCase().includes(keyword.toLowerCase())
		);
	}

	render() {
		const notes = this.getFilteredNotes();

		return (
			<>
				<SearchBar
					keyword={this.state.keyword}
					keywordChange={this.searchHandler}
				/>
				<NoteList
					notes={notes}
					archiveHandler={this.archiveNoteHandler}
					deleteHandler={this.deleteNoteHandler}
				/>
			</>
		);
	}
}

Home.propTypes = {
	defaultKeyword: PropTypes.string,
	keywordChange: PropTypes.func.isRequired,
};

// Providing a default value for defaultKeyword
Home.defaultProps = {
	defaultKeyword: "",
};

export default HomePageWrapper;
