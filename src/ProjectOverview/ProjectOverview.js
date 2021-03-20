import React from 'react';
import { findProject } from '../helper-functions';
import CharaboxContext from '../CharaboxContext';
import { Link } from 'react-router-dom';
import './ProjectOverview.css';

class ProjectOverview extends React.Component {
    static contextType = CharaboxContext;

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
                <Link to={`/edit-project/${project.project_id}`}>
                        <button>Edit</button>
                </Link>
            </div>
        );
    }
}

export default ProjectOverview;