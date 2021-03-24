import React from 'react';
import CharaboxContext from '../CharaboxContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProjectPageNav.css';

class ProjectPageNav extends React.Component {
    static contextType = CharaboxContext;

    render() {
        const projectId = this.props.projectId;
        const characters = this.context.characters.sort((a, b) => a.character_id - b.character_id).map(char => (
            <Link 
                to={`/projects/${projectId}/${char.character_id}`} 
                key={char.character_id}
                className='project-nav-item'
            >
                {char.name}
            </Link>
        ))
        return (
            <div className='project-page-nav'>
                {characters}
                <Link to={`/add-character/${projectId}`} className='project-nav-item'>
                    Add Character
                </Link>
                <Link to='/projects' className='project-nav-item'>
                    Back
                </Link>
            </div>
        );
    }
}

ProjectPageNav.propTypes = {
    projectId: PropTypes.string.isRequired
};

export default ProjectPageNav;