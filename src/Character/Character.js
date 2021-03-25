import React from 'react';
import { findCharacter, getNotesForCharacter } from '../helper-functions';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';
import CharaboxContext from '../CharaboxContext';
import config from '../config';
import PropTypes from 'prop-types';
import './Character.css';

class Character extends React.Component {
    static contextType = CharaboxContext;

    componentDidMount() {
        const { characterId } = this.props.match.params;
        
        // get notes for the character
        fetch(`${config.API_ENDPOINT}/notes?characterId=${characterId}`, {
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
            .then(notes => {
                this.context.getNotes(notes);
            })
            .catch(error => {
                console.error({ error });
            });
    }

    handleDelete = (character_id) => {
        fetch(`${config.API_ENDPOINT}/characters/${character_id}`, {
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
                this.props.history.push(`/projects/${this.props.match.params.projectId}`)
                this.context.deleteCharacter(character_id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const { characterId, projectId } = this.props.match.params;
        const character = findCharacter(this.context.characters, characterId);
        const notesForChar = getNotesForCharacter(this.context.notes, characterId);
        const notes = notesForChar.sort((a, b) => a.note_id - b.note_id).map(note => (
            <Note
                key={note.note_id}
                {...note}
                characterId={characterId}
                projectId={projectId}
            />
        ));
        return (
            <div className='character'>
                <h3>{character.name}</h3>
                <div className='character-info'>
                    <p>Age: {character.age}</p>
                    <p>Occupation: {character.occupation}</p>
                    <p>Role: {character.role}</p>
                    <p>Interests: {character.interests}</p>
                    <p>Personality: {character.personality}</p>
                </div>
                <div className='character-buttons'>
                    <Link to={`/edit-character/${characterId}`}>
                        <button>Edit</button>
                    </Link>
                    {' '}
                    <button
                        onClick={() => this.handleDelete(character.character_id)}
                    >
                        Delete
                    </button>
                </div>
                <h4>Notes:</h4>
                {notes}
                <Link to={`/add-note/${character.project}/${characterId}`}>
                    <button>Add Note</button>
                </Link>
            </div>
        );
    }
}

Character.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default Character;