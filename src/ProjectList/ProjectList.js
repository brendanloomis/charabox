import React from 'react';
import Project from '../Project/Project';
import { Link } from 'react-router-dom';
import './ProjectList.css';

class ProjectList extends React.Component {
    render() {
        const projects = this.props.projects.map(project => (
            <li key={project.project_id}>
                <Project 
                    project_id={project.project_id}
                    project_name={project.project_name}
                    project_type={project.project_type}
                    project_summary={project.project_summary}
                />
            </li>
        ))
        return (
            <div className='project-list'>
                <h2>Projects</h2>
                <ul>
                    {projects}
                </ul>
                <Link to='/add-project' className='add-project-link'>
                    <button id='add-project-button'>Add Project</button>
                </Link>
            </div>
        );
    }
}

export default ProjectList;