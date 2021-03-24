import React from 'react';
import Project from '../Project/Project';
import { Link } from 'react-router-dom';
import CharaboxContext from '../CharaboxContext';
import './ProjectList.css';

class ProjectList extends React.Component {
    static contextType = CharaboxContext;

    render() {
        const projects = this.context.projects.sort((a, b) => a.project_id - b.project_id).map(project => (
            <li key={project.project_id}>
                <Link to={`/projects/${project.project_id}`} className='project-link'>
                    <Project 
                        project_id={project.project_id}
                        project_name={project.project_name}
                        project_type={project.project_type}
                        project_summary={project.project_summary}
                    />
                </Link>
            </li>
        ))
        return (
            <div className='project-list'>
                <h2>Projects</h2>
                <ul>
                    {projects}
                    <li>
                        <Link to='/add-project' className='add-project-link'>
                            <div id='add-project'>
                                <h3>Add Project</h3>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default ProjectList;