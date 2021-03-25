import React from 'react';
import NoteForm from '../NoteForm/NoteForm';
import config from '../config';
import CharaboxContext from '../CharaboxContext';
import PropTypes from 'prop-types';
import './EditNote.css';

class EditNote extends React.Component {
    state = {
        error: null,
        note_id: null,
        note: null,
        character: null,
        infoReady: false
    };

    static contextType = CharaboxContext;

    // get the current information for the note
    componentDidMount() {
        const { note_id } = this.props.match.params;

        fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    note_id: data.note_id,
                    note: data.note,
                    character: data.character,
                    infoReady: true
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleSubmit = (note) => {
        this.setState({ error: null });

        fetch(`${config.API_ENDPOINT}/notes/${note.note_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify(note)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
            })
            .then(() => {
                this.context.updateNote(note);
                this.props.history.goBack();
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleClickCancel = () => {
        const { projectId, characterId } = this.props.match.params;
        this.props.history.push(`/projects/${projectId}/${characterId}`);
    }

    // renders the form after the GET request is done
    renderForm = (note) => {
        if (this.state.infoReady) {
            return (
                <NoteForm
                    error={this.state.error}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleClickCancel}
                    note={note}
                />
            );
        }
    }

    render() {
        const { note_id, note, character } = this.state;
        const noteToEdit = { note_id, note, character };
        return (
            <div className='edit-note'>
                <h2>Edit Note</h2>
                {this.renderForm(noteToEdit)}
            </div>
        );
    }
}

EditNote.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    })
};

export default EditNote;