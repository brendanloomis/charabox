import React from 'react';
import { findProject, getCharactersForProject } from '../helper-functions';
import Character from '../Character/Character';
import './ProjectPage.css';

class ProjectPage extends React.Component {
    render() {
        const { projectId } = this.props.match.params;
        const project = findProject(this.props.projects, projectId);
        const charactersForProject = getCharactersForProject(this.props.characters, projectId);
        const characters = charactersForProject.map(char => (
            <Character
                {...char}
                notes={this.props.notes}
            />
        ));
        return (
            <div className='project-page'>
                <h2>{project.project_name}</h2>
                <button onClick={() => this.props.history.goBack()} className='project-page-button'>Back</button>
                {characters}
            </div>
        );
    }
}

export default ProjectPage;