import React from 'react';
import CharaboxContext from '../CharaboxContext';
import Movie from '../images/Movie.jpg';
import Book from '../images/Book.jpg';
import Television from '../images/Television.jpg';
import Game from '../images/Game.jpg';
import Play from '../images/Play.jpg';
import PropTypes from 'prop-types';
import './Project.css';

class Project extends React.Component {
    static contextType = CharaboxContext;

    getImage = (type) => {
        if (type === 'Movie') {
            return Movie;
        } else if (type === 'Book') {
            return Book;
        } else if (type === 'Television') {
            return Television;
        } else if (type === 'Game') {
            return Game;
        } else {
            return Play;
        }
    }

    render() {
        return (
            <div className='project'>
                <div className='project-image'>
                    <img src={this.getImage(this.props.project_type)} alt={`${this.props.project_type}`}/>
                </div>
                <h3>
                    {this.props.project_name}
                </h3>
            </div>
        );
    }
}

Project.propTypes = {
    project_type: PropTypes.string.isRequired,
    project_name: PropTypes.string.isRequired
};

export default Project;