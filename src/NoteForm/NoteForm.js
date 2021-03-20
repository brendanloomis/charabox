import React from 'react';
import CharaboxContext from '../CharaboxContext';
import ValidationError from '../ValidationError';
import './NoteForm.css';

class NoteForm extends React.Component {
    state = {
        note_id: this.props.note.note_id || undefined,
        note: this.props.note.note || '',
        character: this.props.note.character || this.props.character
    }

    static defaultProps = {
        note: {}
    };

    static contextType = CharaboxContext;

    updateNote(note) {
        this.setState({ note });
    }

    updateCharacter(character) {
        this.setState({ character });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { note_id, note, character } = this.state;

        this.props.onSubmit(
            {
                note_id,
                note,
                character
            }
        );
    }

    render() {
        const { note_id, note, character } = this.state;
        const { error, onCancel } = this.props;
        const characterOptions = this.context.characters.map(char => {
            return (
                <option key={char.character_id} value={char.character_id}>
                    {char.name}
                </option>
            );
        });
        return (
            <form className='note-form' onSubmit={this.handleSubmit}>
                {note_id && <input type='hidden' name='note_id' value={note_id} />}
                <div>
                    <label htmlFor='character'>Character</label>
                    <select 
                        name='character'
                        id='character'
                        required
                        defaultValue={character}
                        onChange={e => this.updateCharacter(e.target.value)}
                    >
                        {characterOptions}
                    </select>
                </div>
                <div>
                    <label htmlFor='note'>Note</label>
                    <textarea
                        name='note'
                        id='note'
                        required
                        value={note}
                        onChange={e => this.updateNote(e.target.value)}
                    />
                </div>
                {error && <ValidationError message={error.message} />}
                <div className='note-form-buttons'>
                    <button type='submit'>Submit</button>
                    {' '}
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

export default NoteForm;