import React from 'react';
import CharaboxContext from '../CharaboxContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './ProjectForm.css';

class ProjectForm extends React.Component {
    state = {
        project_id: this.props.project.project_id || undefined,
        project_name: this.props.project.project_name || '',
        project_type: this.props.project.project_type || '',
        project_summary: this.props.project.project_summary || '',
        user_id: this.context.userInfo.user_id,
    }

    static defaultProps = {
        project: {}
    };

    static contextType = CharaboxContext;

    // functions to update state for form inputs
    updateProjectName(project_name) {
        this.setState({ project_name });
    }

    updateProjectType(project_type) {
        this.setState({ project_type });
    }

    updateProjectSummary(project_summary) {
        this.setState({ project_summary });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { project_id, project_name, project_type, project_summary, user_id } = this.state;

        this.props.onSubmit(
            {
                project_id,
                project_name,
                project_type,
                project_summary,
                user_id
            }
        );
    }

    render() {
        const { project_id, project_name, project_type, project_summary, user_id } = this.state;
        const { error, onCancel } = this.props;
        return (
            <form className='project-form' onSubmit={this.handleSubmit}>
                {project_id && <input type='hidden' name='project_id' value={project_id} />}
                {user_id && <input type='hidden' name='user_id' value={user_id} />}
                <div>
                    <label htmlFor='project-name'>Project Name</label>
                    <input 
                        type='text'
                        name='project-name'
                        id='project-name'
                        required
                        value={project_name}
                        onChange={e => this.updateProjectName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='project-type'>Project Type</label>
                    <select
                        name='project-type'
                        id='project-type'
                        required
                        value={project_type}
                        onChange={e => this.updateProjectType(e.target.value)}
                    >
                        <option value='Movie'>Movie</option>
                        <option value='Book'>Book</option>
                        <option value='Television'>Television</option>
                        <option value='Play'>Play</option>
                        <option value='Game'>Game</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='project-summary'>Project Summary</label>
                    <textarea
                        name='project-summary'
                        id='project-summary'
                        required
                        value={project_summary}
                        onChange={e => this.updateProjectSummary(e.target.value)}
                    />
                </div>
                {error && <ValidationError message={error.message} />}
                <div className='project-form-buttons'>
                    <button type='submit'>Submit</button>
                    {' '}
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

ProjectForm.propTypes = {
    project: PropTypes.shape({
        project_id: PropTypes.number,
        project_name: PropTypes.string,
        project_type: PropTypes.string,
        project_summary: PropTypes.string
    }),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default ProjectForm;