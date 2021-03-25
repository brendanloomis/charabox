import React from 'react';
import CharaboxContext from '../CharaboxContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './CharacterForm.css';

class CharacterForm extends React.Component {
    state = {
        character_id: this.props.character.character_id || undefined,
        name: this.props.character.name || '',
        age: this.props.character.age || '',
        occupation: this.props.character.occupation || '',
        role: this.props.character.role || '',
        interests: this.props.character.interests || '',
        personality: this.props.character.personality || '',
        project: this.props.character.project || this.props.project
    }

    static defaultProps = {
        character: {}
    };

    static contextType = CharaboxContext;

    // functions to update state for form inputs
    updateName(name) {
        this.setState({ name });
    }

    updateAge(age) {
        this.setState({ age });
    }

    updateOccupation(occupation) {
        this.setState({ occupation });
    }

    updateRole(role) {
        this.setState({ role });
    }

    updateInterests(interests) {
        this.setState({ interests });
    }

    updatePersonality(personality) {
        this.setState({ personality });
    }

    updateProject(project) {
        this.setState({ project });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { character_id, name, age, occupation, role, interests, personality, project } = this.state;

        this.props.onSubmit(
            {
                character_id,
                name,
                age,
                occupation,
                role,
                interests,
                personality,
                project
            }
        );
    }

    render() {
        const { character_id, name, age, occupation, role, interests, personality, project } = this.state;
        const { error, onCancel } = this.props;
        // create options for Project select field
        const projectOptions = this.context.projects.map(project => {
            return (
                <option key={project.project_id} value={project.project_id}>
                    {project.project_name}
                </option>
            );
        });
        return (
            <form className='character-form' onSubmit={this.handleSubmit}>
                {character_id && <input type='hidden' name='character_id' value={character_id} />}
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        required
                        value={name}
                        onChange={e => this.updateName(e.target.value)}
                    />                    
                </div>
                <div>
                    <label htmlFor='age'>Age</label>
                    <input
                        type='text'
                        name='age'
                        id='age'
                        required
                        value={age}
                        onChange={e => this.updateAge(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='occupation'>Occupation</label>
                    <input
                        type='text'
                        name='occupation'
                        id='occupation'
                        required
                        value={occupation}
                        onChange={e => this.updateOccupation(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='role'>Role</label>
                    <select 
                        name='role'
                        id='role'
                        required
                        defaultValue={role}
                        onChange={e => this.updateRole(e.target.value)}
                    >
                        <option value='Protagonist'>Protagonist</option>
                        <option value='Antagonist'>Antagonist</option>
                        <option value='Love Interest'>Love Interest</option>
                        <option value='Secondary Character'>Secondary Character</option>
                        <option value='Tertiary Character'>Tertiary Character</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='interests'>Interests</label>
                    <input
                        type='text'
                        name='interests'
                        id='interests'
                        required
                        value={interests}
                        onChange={e => this.updateInterests(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='personality'>Personality</label>
                    <input
                        type='text'
                        name='personality'
                        id='personality'
                        required
                        value={personality}
                        onChange={e => this.updatePersonality(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='project'>Project</label>
                    <select
                        name='project'
                        id='project'
                        required
                        defaultValue={project}
                        onChange={e => this.updateProject(e.target.value)}
                    >
                        {projectOptions}
                    </select>
                </div>
                {error && <ValidationError message={error.message} />}
                <div className='character-form-buttons'>
                    <button type='submit'>Submit</button>
                    {' '}
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

CharacterForm.propTypes = {
    character: PropTypes.shape({
        character_id: PropTypes.number,
        name: PropTypes.string,
        age: PropTypes.string,
        occupation: PropTypes.string,
        role: PropTypes.string,
        interests: PropTypes.string,
        personality: PropTypes.string,
        project: PropTypes.number
    }),
    project: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default CharacterForm;