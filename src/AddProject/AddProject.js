import React from 'react';
import ProjectForm from '../ProjectForm/ProjectForm';
import CharaboxContext from '../CharaboxContext';
import config from '../config';
import PropTypes from 'prop-types';
import './AddProject.css';

class AddProject extends React.Component {
    state = {
        error: null
    };

    static contextType = CharaboxContext;

    handleSubmit = (project) => {
        this.setState({ error: null });
        
        fetch(`${config.API_ENDPOINT}/projects`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify(project)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
                return res.json();
            })
            .then(data => {
                this.context.addProject(data);
                this.props.history.push(`/projects/${data.project_id}`);
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleClickCancel = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className='add-project'>
                <h2>Add Project</h2>
                <ProjectForm 
                    error={this.state.error}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleClickCancel}
                />
            </div>
        );
    }
}

AddProject.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    })
};

export default AddProject;