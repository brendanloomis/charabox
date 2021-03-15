import React from 'react';
import './AddNote.css';

class AddNote extends React.Component {
    render() {
        return (
            <div className='add-note'>
                <h2>Add Note</h2>
                <form className='add-note-form'>
                    <div>
                        <label htmlFor='character'>Character</label>
                        <input 
                            type='text'
                            name='character'
                            id='character'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='note'>Note</label>
                        <textarea
                            name='note'
                            id='note'
                            required
                        />
                    </div>
                    <div className='add-note-buttons'>
                        <button type='submit'>Submit</button>
                        <button onClick={() => this.props.history.goBack()}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddNote;