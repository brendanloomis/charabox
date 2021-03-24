import React from 'react';
import { findProject } from '../helper-functions';
import CharaboxContext from '../CharaboxContext';
import { Link } from 'react-router-dom';
import config from '../config';
import PropTypes from 'prop-types';
import './ProjectOverview.css';

class ProjectOverview extends React.Component {
    static contextType = CharaboxContext;

    handleDelete = (project_id) => {
        fetch(`${config.API_ENDPOINT}/projects/${project_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
            })
            .then(() => {
                this.props.history.push('/projects');
                this.context.deleteProject(project_id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const { projectId } = this.props.match.params;
        const project = findProject(this.context.projects, projectId);
        return (
            <div className='project-overview'>
                <h3>{project.project_name}</h3>
                <h4>Type</h4>
                <p>{project.project_type}</p>
                <h4>Summary</h4>
                <p>{project.project_summary}</p>
                <div className='project-overview-buttons'>
                    <Link to={`/edit-project/${project.project_id}`}>
                            <button>Edit</button>
                    </Link>
                    {' '}
                    <button
                            onClick={() => this.handleDelete(project.project_id)}
                        >
                            Delete
                    </button>
                </div>
            </div>
        );
    }
}

ProjectOverview.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default ProjectOverview;