import React from 'react';
import CharacterForm from '../CharacterForm/CharacterForm';
import config from '../config';
import CharaboxContext from '../CharaboxContext';
import PropTypes from 'prop-types';
import './EditCharacter.css';

class EditCharacter extends React.Component {
    state = {
        error: null,
        character_id: null,
        name: null,
        age: null,
        occupation: null,
        role: null,
        interests: null,
        personality: null,
        project: null,
        infoReady: false
    }

    static contextType = CharaboxContext;

    // get the current information for the character
    componentDidMount() {
        const { character_id } = this.props.match.params;
        fetch(`${config.API_ENDPOINT}/characters/${character_id}`, {
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
                    })
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    character_id: data.character_id,
                    name: data.name,
                    age: data.age,
                    occupation: data.occupation,
                    role: data.role,
                    interests: data.interests,
                    personality: data.personality,
                    project: data.project,
                    infoReady: true
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleSubmit = (character) => {
        this.setState({ error: null });

        fetch(`${config.API_ENDPOINT}/characters/${character.character_id}`, {
            method: 'PATCH',
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
            })
            .then(() => {
                this.context.updateCharacter(character);
                this.props.history.push(`/projects/${character.project}/${character.character_id}`);
            });
    }

    handleClickCancel = () => {
        this.props.history.goBack();
    }

    // renders the form after the GET request is done
    renderForm = (character) => {
        if (this.state.infoReady) {
            return (
                <CharacterForm
                    error={this.state.error}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleClickCancel}
                    character={character}
                />
            );
        }
    }

    render() {
        const { character_id, name, age, occupation, role, interests, personality, project } = this.state;
        const character = { character_id, name, age, occupation, role, interests, personality, project };
        return (
            <div className='edit-character'>
                <h2>Edit Character</h2>
                {this.renderForm(character)}
            </div>
        );
    }
}

EditCharacter.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    }),
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired
    })
};

export default EditCharacter;