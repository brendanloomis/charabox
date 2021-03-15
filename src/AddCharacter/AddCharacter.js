import React from 'react';
import './AddCharacter.css';

class AddCharacter extends React.Component {
    render() {
        return (
            <div className='add-character'>
                <h2>Add Character</h2>
                <form className='add-character-form'>
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
                    <div className='add-character-buttons'>
                        <button type='submit'>Submit</button>
                        <button onClick={() => this.props.history.goBack()}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddCharacter;