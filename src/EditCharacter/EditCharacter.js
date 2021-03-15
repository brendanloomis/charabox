import React from 'react';
import './EditCharacter.css';

class EditCharacter extends React.Component {
    render() {
        return (
            <div className='edit-character'>
                <h2>Edit Character</h2>
                <form className='edit-character-form'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            required
                        />                    
                    </div>
                    <div>
                        <label htmlFor='age'>Age</label>
                        <input
                            type='text'
                            name='age'
                            id='age'
                        />
                    </div>
                    <div>
                        <label htmlFor='occupation'>Occupation</label>
                        <input
                            type='text'
                            name='occupation'
                            id='occupation'
                        />
                    </div>
                    <div>
                        <label htmlFor='role'>Role</label>
                        <input 
                            type='text'
                            name='role'
                            id='role'
                        />
                    </div>
                    <div>
                        <label htmlFor='interests'>Interests</label>
                        <input
                            type='text'
                            name='interests'
                            id='interests'
                        />
                    </div>
                    <div>
                        <label htmlFor='personality'>Personality</label>
                        <input
                            type='text'
                            name='personality'
                            id='personality'
                        />
                    </div>
                    <div className='edit-character-buttons'>
                        <button type='submit'>Submit</button>
                        <button onClick={() => this.props.history.goBack()}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditCharacter;