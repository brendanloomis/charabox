import React from 'react';
import { findProject } from '../helper-functions';
import CharaboxContext from '../CharaboxContext';
import config from '../config';
import ProjectPageNav from '../ProjectPageNav/ProjectPageNav';
import { Link } from 'react-router-dom';
import './ProjectPage.css';

class ProjectPage extends React.Component {

    static contextType = CharaboxContext;

    componentDidMount() {
        const { projectId } = this.props.match.params;

        fetch(`${config.API_ENDPOINT}/characters?projectId=${projectId}`, {
            method: 'GET',
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
                return res.json();
            })
            .then(characters => {
                this.context.getCharacters(characters);
                this.context.loadCharacters();
            })
            .catch(error => {
                console.error({ error });
            });
    }

    render() {
        const { projectId } = this.props.match.params;
        const project = findProject(this.context.projects, projectId);
        return (
            <div className='project-page'>
                <Link to={`/projects/${projectId}`} className='project-page-h2-link'>
                    <h2>{project.project_name}</h2>
                </Link>
                <ProjectPageNav projectId={projectId}/>
            </div>
        );
    }
}

export default ProjectPage;