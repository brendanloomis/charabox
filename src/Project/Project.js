import React from 'react';
import { Link } from 'react-router-dom';
import './Project.css';

class Project extends React.Component {
    render() {
        return (
            <div className='project'>
                <h3>
                    <Link to={`/demo/${this.props.project_id}`} className='project-link'>
                        {this.props.project_name}
                    </Link>
                </h3>
                <p>Type: {this.props.project_type}</p>
                <p>Summary: {this.props.project_summary}</p>
                <div className='project-buttons'>
                    <button>Edit</button>
                    {' '}
                    <button>Delete</button>
                </div>
            </div>
        );
    }
}

export default Project;