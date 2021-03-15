import React from 'react';
import Nav from '../Nav/Nav';
import Landing from '../Landing/Landing';
import { Route } from 'react-router-dom';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import ProjectList from '../ProjectList/ProjectList';
import ProjectPage from '../ProjectPage/ProjectPage';
import AddProject from '../AddProject/AddProject';
import EditProject from '../EditProject/EditProject';
import AddCharacter from '../AddCharacter/AddCharacter';
import EditCharacter from '../EditCharacter/EditCharacter';
import AddNote from '../AddNote/AddNote';
import store from '../store';
import './App.css';

class App extends React.Component {
  renderRoutes() {
    const { projects, characters, notes } = store;
    return (
      <>
        <Route 
          exact
          path='/'
          component={Landing}
        />
        <Route 
          exact
          path='/signup'
          component={Signup}
        />
        <Route
          exact
          path='/login'
          component={Login}
        />
        <Route
          exact
          path='/projects'
          render={() => (
            <ProjectList 
              projects={projects}
            />
          )}
        />
        <Route
          path='/demo/:projectId'
          render={(props) => (
            <ProjectPage
              projects={projects}
              characters={characters}
              notes={notes}
              {...props}
            />
          )}
        />
        <Route
          exact
          path='/add-project'
          render={(props) => (
            <AddProject
              {...props}
            />
          )}
        />
        <Route
          exact
          path='/edit-project'
          render={(props) => (
            <EditProject
              {...props}
            />
          )}
        />
        <Route
          exact
          path='/add-character'
          render={(props) => (
            <AddCharacter
              {...props}
            />
          )}
        />
        <Route
          exact
          path='/edit-character'
          render={(props) => (
            <EditCharacter
              {...props}
            />
          )}
        />
        <Route
          exact
          path='/add-note'
          render={(props) => (
            <AddNote
              {...props}
            />
          )}
        />
      </>
    );
  }

  render() {
    return (
      <div className='App'>
        <header>
          <h1>Charabox</h1>
        </header>
        <Nav />
        {this.renderRoutes()}
      </div>
    );
  }
}

export default App;