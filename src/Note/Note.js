import React from 'react';
import { Link } from 'react-router-dom';
import CharaboxContext from '../CharaboxContext';
import config from '../config';
import './Note.css';

class Note extends React.Component {
    static contextType = CharaboxContext;

    handleDelete = (note_id) => {
        fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
            method: 'DELETE',
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
            })
            .then(() => {
                this.context.deleteNote(note_id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <div className='note'>
                <div className='note-content'>
                    <p>{this.props.note}</p>
                </div>
                <div className='note-buttons'>
                    <Link to={`/edit-note/${this.props.projectId}/${this.props.characterId}/${this.props.note_id}`}>
                        <button>Edit</button>
                    </Link>
                    {' '}
                    <button
                        onClick={() => this.handleDelete(this.props.note_id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

export default Note;