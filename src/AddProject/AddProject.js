import React from 'react';
import './AddProject.css';

class AddProject extends React.Component {
    render() {
        return (
            <div className='add-project'>
                <h2>Add Project</h2>
                <form className='add-project-form'>
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
                    <div className='add-project-buttons'>
                        <button type='submit'>Submit</button>
                        <button onClick={() => this.props.history.goBack()}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddProject;