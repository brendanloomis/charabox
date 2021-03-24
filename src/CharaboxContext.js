import React from 'react';

const CharaboxContext = React.createContext({
    userInfo: {},
    loggedIn: false,
    projects: [],
    characters: [],
    notes: [],
    usernames: [],
    loginUser: () => {},
    logoutUser: () => {},
    getProjects: () => {},
    getCharacters: () => {},
    getNotes: () => {},
    addProject: () => {},
    addCharacter: () => {},
    updateProject: () => {},
    loadedCharacters: false,
    loadCharacters: () => {},
    updateCharacter: () => {},
    addNote: () => {},
    updateNote: () => {},
    deleteCharacter: () => {},
    deleteProject: () => {},
    deleteNote: () => {},
    loadProjects: () => {},
});

export default CharaboxContext;