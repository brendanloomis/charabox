import React from 'react';
import CharacterForm from '../CharacterForm/CharacterForm';
import CharaboxContext from '../CharaboxContext';
import config from '../config';
import PropTypes from 'prop-types';
import './AddCharacter.css';

class AddCharacter extends React.Component {
    state = {
        error: null
    };

    static contextType = CharaboxContext;

    handleSubmit = (character) => {
        this.setState({ error: null });
        
        fetch(`${config.API_ENDPOINT}/characters`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify(character)
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
                this.context.addCharacter(data);
                this.props.history.push(`/projects/${data.project}/${data.character_id}`);
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
        const { project } = this.props.match.params;
        return (
            <div className='add-character'>
                <h2>Add Character</h2>
                <CharacterForm
                    error={this.state.error}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleClickCancel}
                    project={project}
                />
            </div>
        );
    }
}

AddCharacter.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default AddCharacter;