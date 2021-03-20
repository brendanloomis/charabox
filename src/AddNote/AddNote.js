import React from 'react';
import NoteForm from '../NoteForm/NoteForm';
import config from '../config';
import './AddNote.css';
import CharaboxContext from '../CharaboxContext';

class AddNote extends React.Component {
    state = {
        error: null
    };

    static contextType = CharaboxContext;

    handleSubmit = (note) => {
        this.setState({ error: null });
        
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
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
                return res.json();
            })
            .then(data => {
                this.context.addNote(data);
                this.props.history.goBack();
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleClickCancel = () => {
        this.props.history.goBack();
    }

    render() {
        const { character } = this.props.match.params;
        return (
            <div className='add-note'>
                <h2>Add Note</h2>
                <NoteForm
                    error={this.state.error}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleClickCancel}
                    character={character}
                />
            </div>
        );
    }
}

export default AddNote;