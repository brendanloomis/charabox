export const findProject = (projects, projectId) => 
    projects.find(project => project.project_id === parseInt(projectId));

export const findCharacter = (characters, characterId) =>
    characters.find(character => character.character_id === parseInt(characterId));

export const getCharactersForProject = (characters, projectId) => (
    (!projectId)
        ? characters
        : characters.filter(char => char.project === projectId)
);

export const getNotesForCharacter = (notes, charId) => (
    (!charId) 
        ? notes
        : notes.filter(note => note.character === parseInt(charId))
);