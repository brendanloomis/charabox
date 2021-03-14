import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

class Landing extends React.Component {
    render() {
        return (
            <div className='landing'>
                <section className='about'>
                    <h2>Working on writing a book or a script?</h2>
                    <p>Charabox allows you to manage character information and character development for any project that you are working on.</p>
                </section>
                <section className='about-2'>
                    <h2>Character Information All in One Place</h2>
                    <p>Keep all of the characters you create for a project in one area that is easy to manage, so you can stay organized.</p>
                </section>
                <section className='start'>
                    <h2>Sign Up and Get Started Today!</h2>
                    <p>Create a <Link to='/signup' className='landing-signup'>new account</Link>, or log in with the demo account to get started today!</p>
                </section>
            </div>
        )
    }
}

export default Landing;