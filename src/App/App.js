import React from 'react';
import Nav from '../Nav/Nav';
import Landing from '../Landing/Landing';
import { Redirect, Route } from 'react-router-dom';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import ProjectList from '../ProjectList/ProjectList';
import ProjectPage from '../ProjectPage/ProjectPage';
import AddProject from '../AddProject/AddProject';
import EditProject from '../EditProject/EditProject';
import AddCharacter from '../AddCharacter/AddCharacter';
import EditCharacter from '../EditCharacter/EditCharacter';
import AddNote from '../AddNote/AddNote';
import EditNote from '../EditNote/EditNote';
import CharaboxContext from '../CharaboxContext';
import Character from '../Character/Character';
import ProjectOverview from '../ProjectOverview/ProjectOverview';
import config from '../config';
import './App.css';

class App extends React.Component {
  state = {
    userInfo: {},
    loggedIn: false,
    checkedIfLoggedIn: false,
    usernames: [],
    projects: [],
    characters: [],
    notes: [],
    loadedProjects: false,
    loadedCharacters: false,
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/users/usernames`, {
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
      .then(usernames => {
        this.setState({ usernames });
      })
      .catch(err => {
        console.error({ err });
      });

    // check if the user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('cbUser'));
    if (loggedInUser) {
      this.loginUser(loggedInUser);
      let userId = loggedInUser.user_id;
      if (!userId) {
        userId = this.state.userInfo.userId;
      }
      fetch(`${config.API_ENDPOINT}/projects?userId=${userId}`, {
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
        .then(projects => {
            this.getProjects(projects);
            this.setState({
              loadedProjects: true
            });
        })
        .catch(error => {
            console.error({ error });
        });
    }
    this.setState({
      checkedIfLoggedIn: true
    });
  }

  renderRoutes() {
    // render routes after checking if user is logged in
    // redirects paths to login page if the user needs to be logged in to access them
    //const { projects, characters, notes } = store;
    if (this.state.checkedIfLoggedIn) {
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
              !this.state.loggedIn ? (
                <Redirect to='/login' />
              ) : (
              <ProjectList />
              )
            )}
          />
          {this.renderAfterLoadingProjects()}
        </>
      );
    }
  }

  renderAfterLoadingProjects() {
    if (this.state.loadedProjects) {
      return (
        <>
          <Route
            path='/projects/:projectId'
            render={(props) => (
              <ProjectPage {...props} />
            )}
          />
          <Route
            exact
            path='/add-project'
            render={(props) => (
              <AddProject {...props} />
            )}
          />
          <Route
            exact
            path='/edit-project/:project_id'
            render={(props) => (
              <EditProject {...props} />
            )}
          />
          <Route
            exact
            path='/add-character/:project'
            render={(props) => (
              <AddCharacter {...props} />
            )}
          />
          <Route
            exact
            path='/edit-character/:character_id'
            render={(props) => (
              <EditCharacter {...props} />
            )}
          />
          <Route
            exact
            path='/add-note/:project_id/:character'
            render={(props) => (
              <AddNote {...props} />
            )}
          />
          <Route
            exact
            path='/edit-note/:projectId/:characterId/:note_id'
            render={(props) => (
              <EditNote {...props} />
            )}
          />
          <Route
            exact
            path='/projects/:projectId'
            render={(props) => (
              <ProjectOverview {...props} />
            )}
          />
          {this.renderAfterLoadingCharacters()}
        </>
      );
    } else if (!this.state.loggedIn) {
      return (
        <>
          <Route
            path='/projects/:projectId'
            render={() => (
              <Redirect to='/login' />
            )}
          />
          <Route
            exact
            path='/add-project'
            render={() => (
                <Redirect to='/login' />
            )}
          />
          <Route
            exact
            path='/edit-project/:project_id'
            render={() => (
                <Redirect to='/login' />
            )}
          />
          <Route
            exact
            path='/add-character/:project'
            render={() => (
                <Redirect to='/login' />
            )}
          />
          <Route
            exact
            path='/edit-character/:character_id'
            render={() => (
                <Redirect to='/login' />
            )}
          />
          <Route
            exact
            path='/add-note/:project_id/:character'
            render={() => (
                <Redirect to='/login' />
            )}
          />
          <Route
            exact
            path='/edit-note/:projectId/:characterId/:note_id'
            render={() => (
                <Redirect to='/login' />
            )}
          />
          <Route
            exact
            path='/projects/:projectId'
            render={(props) => (
                <Redirect to='/login' />
            )}
          />
          <Route
            exact
            path='/projects/:projectId/:characterId'
            render={(props) => ( 
                <Redirect to='/login' />
            )}
          />
        </>
      )
    }
  }

  renderAfterLoadingCharacters() {
    if (this.state.loadedCharacters) {
      return (
        <>
          <Route
            exact
            path='/projects/:projectId/:characterId'
            render={(props) => (
              <Character
                key={props.match.params.characterId}
                {...props}
              />
            )}
          />
        </>
      )
    }
  }

  loginUser = user => {
    this.setState({
      userInfo: user,
      loggedIn: true,
    });
  }

  logoutUser = () => {
    this.setState({
      userInfo: {},
      loggedIn: false
    });
  }

  loadCharacters = () => {
    this.setState({
      loadedCharacters: true
    });
  }

  getProjects = (projects) => {
    this.setState({ projects });
  }

  getCharacters = (characters) => {
    this.setState({ characters });
  }

  getNotes = (notes) => {
    this.setState({ notes });
  }

  addProject = (project) => {
    this.setState({
      projects: [ ...this.state.projects, project ]
    });
  }

  addCharacter = (character) => {
    this.setState({
      characters: [ ...this.state.characters, character ]
    });
  }

  addNote = (note) => {
    this.setState({
      notes: [ ...this.state.notes, note ]
    });
  }

  updateProject = (updatedProject) => {
    this.setState({
      projects: this.state.projects.map(p => 
        (p.project_id !== updatedProject.project_id) ? p : updatedProject  
      )
    });
  }

  updateCharacter = (updatedCharacter) => {
    this.setState({
      characters: this.state.characters.map(c => 
        (c.character_id !== updatedCharacter.character_id) ? c : updatedCharacter
      )
    });
  }

  updateNote = (updatedNote) => {
    this.setState({
      notes: this.state.notes.map(n => 
        (n.note_id !== updatedNote.note_id) ? n : updatedNote
      )
    });
  }

  deleteProject = (projectId) => {
    const newProjects = this.state.projects.filter(p => (
      p.project_id !== projectId
    ));
    this.setState({
      projects: newProjects
    });
  }

  deleteCharacter = (characterId) => {
    const newCharacters = this.state.characters.filter(c => (
      c.character_id !== characterId
    ));
    this.setState({
      characters: newCharacters
    });
  }

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(n => (
      n.note_id !== noteId
    ));
    this.setState({
      notes: newNotes
    });
  }

  render() {
    const contextValue = {
      userInfo: this.state.userInfo,
      loggedIn: this.state.loggedIn,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
      usernames: this.state.usernames,
      getProjects: this.getProjects,
      projects: this.state.projects,
      getCharacters: this.getCharacters,
      characters: this.state.characters,
      getNotes: this.getNotes,
      notes: this.state.notes,
      addProject: this.addProject,
      addCharacter: this.addCharacter,
      updateProject: this.updateProject,
      loadedCharacters: this.state.loadedCharacters,
      loadCharacters: this.loadCharacters,
      updateCharacter: this.updateCharacter,
      addNote: this.addNote,
      updateNote: this.updateNote,
      deleteProject: this.deleteProject,
      deleteCharacter: this.deleteCharacter,
      deleteNote: this.deleteNote,
    }
    return (
      <CharaboxContext.Provider value={contextValue}>
        <div className='App'>
          <header>
            <h1>Charabox</h1>
          </header>
          <Nav />
          {this.renderRoutes()}
        </div>
      </CharaboxContext.Provider>
    );
  }
}

export default App;