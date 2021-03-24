import React from 'react';
import { Link } from 'react-router-dom';
import CharaboxContext from '../CharaboxContext';
import Movie from '../images/Movie.jpg';
import Book from '../images/Book.jpg';
import Television from '../images/Television.jpg';
import Game from '../images/Game.jpg';
import Play from '../images/Play.jpg';
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
                    <Link to={`/projects/${this.props.project_id}`} className='project-link'>
                        {this.props.project_name}
                    </Link>
                </h3>
            </div>
        );
    }
}

export default Project;