import React from 'react';
import ProjectForm from '../ProjectForm/ProjectForm';
import config from '../config';
import CharaboxContext from '../CharaboxContext';
import PropTypes from 'prop-types';
import './EditProject.css';

class EditProject extends React.Component {
    state = {
        error: null,
        project_id: null,
        project_name: null,
        project_type: null,
        project_summary: null,
        infoReady: false
    }

    static contextType = CharaboxContext;

    // get the current information for the project
    componentDidMount() {
        const { project_id } = this.props.match.params;

        fetch(`${config.API_ENDPOINT}/projects/${project_id}`, {
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
            .then(data => {
                this.setState({
                    project_id: data.project_id,
                    project_name: data.project_name,
                    project_type: data.project_type,
                    project_summary: data.project_summary,
                    infoReady: true
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleSubmit = (project) => {
        this.setState({ error: null });

        fetch(`${config.API_ENDPOINT}/projects/${project.project_id}`, {
            method: 'PATCH',
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
            })
            .then(() => {
                this.context.updateProject(project);
                this.props.history.goBack();
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleClickCancel = () => {
        this.props.history.push('/projects');
    }

    // renders the form after the GET request is done
    renderForm = (project) => {
        if (this.state.infoReady) {
            return (
                <ProjectForm
                    error={this.state.error}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleClickCancel}
                    project={project}
                />
            );
        }
    }

    render() {
        const { project_id, project_name, project_type, project_summary } = this.state;
        const project = { project_id, project_name, project_type, project_summary };
        return (
            <div className='edit-project'>
                <h2>Edit Project</h2>
                {this.renderForm(project)}
            </div>
        );
    }
}

EditProject.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    }),
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired
    })
};

export default EditProject;