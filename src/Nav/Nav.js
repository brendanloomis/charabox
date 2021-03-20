import React from 'react';
import { Link } from 'react-router-dom';
import CharaboxContext from '../CharaboxContext';
import './Nav.css';

class Nav extends React.Component {
    static contextType = CharaboxContext;

    // if user is logged in, render a log out link in Nav bar
    // if user is not logged in, render a log out link in the Nav bar
    checkLoggedIn() {
        if (this.context.loggedIn) {
            return <Link to='/' className='nav-item' onClick={this.handleLogout}>Log Out</Link>;
        }
        return <Link to='/login' className='nav-item'>Log In</Link>;
    }

    handleLogout = () => {
        this.context.logoutUser();
        localStorage.clear();
    }

    render() {
        return (
            <div className='nav'>
                <Link to='/' className='nav-item'>Home</Link>
                {' '}
                <Link to='/projects' className='nav-item'>Projects</Link>
                {' '}
                {this.checkLoggedIn()}
            </div>
        );
    }
}

export default Nav;