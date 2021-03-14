import React from 'react';
import { getNotesForCharacter } from '../helper-functions';
import Note from '../Note/Note';
import './Character.css';

class Character extends React.Component {
    render() {
        const notesForChar = getNotesForCharacter(this.props.notes, this.props.character_id);
        const notes = notesForChar.map(note => (
            <Note
                {...note}
            />
        ));
        return (
            <div className='character'>
                <h3>{this.props.name}</h3>
                <p>Age: {this.props.age}</p>
                <p>Occupation: {this.props.occupation}</p>
                <p>Role: {this.props.role}</p>
                <p>Interests: {this.props.interests}</p>
                <p>Personality: {this.props.personality}</p>
                <button>Edit</button>
                <h4>Notes:</h4>
                {notes}
                <button>Add Note</button>
            </div>
        );
    }
}

export default Character;