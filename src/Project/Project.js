import React from 'react';
import { Link } from 'react-router-dom';
import CharaboxContext from '../CharaboxContext';
import config from '../config';
import './Project.css';

class Project extends React.Component {
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
                this.context.deleteProject(project_id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <div className='project'>
                <h3>
                    <Link to={`/projects/${this.props.project_id}`} className='project-link'>
                        {this.props.project_name}
                    </Link>
                </h3>
                <p>Type: {this.props.project_type}</p>
                <p>Summary: {this.props.project_summary}</p>
                <div className='project-buttons'>
                    <Link to={`/edit-project/${this.props.project_id}`}>
                        <button>Edit</button>
                    </Link>
                    {' '}
                    <button
                        onClick={() => this.handleDelete(this.props.project_id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

export default Project;