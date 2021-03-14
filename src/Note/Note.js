import React from 'react';
import './Note.css';

class Note extends React.Component {
    render() {
        return (
            <div className='note'>
                <p>{this.props.note}</p>
                <div className='note-buttons'>
                    <button>Edit</button>
                    {' '}
                    <button>Delete</button>
                </div>
            </div>
        );
    }
}

export default Note;