import React from 'react';
import './EditProject.css';

class EditProject extends React.Component {
    render() {
        return (
            <div className='edit-project'>
                <h2>Edit Project</h2>
                <form className='edit-project-form'>
                    <div>
                        <label htmlFor='project-name'>Project Name</label>
                        <input 
                            type='text'
                            name='project-name'
                            id='project-name'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='project-type'>Project Type</label>
                        <input
                            type='text'
                            name='project-type'
                            id='project-type'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='project-summary'>Project Summary</label>
                        <textarea
                            name='project-summary'
                            id='project-summary'
                        />
                    </div>
                    <div className='edit-project-buttons'>
                        <button type='submit'>Submit</button>
                        <button onClick={() => this.props.history.goBack()}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditProject;