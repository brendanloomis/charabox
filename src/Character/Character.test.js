import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CharaboxContext from '../CharaboxContext';
import Character from './Character';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        match: {
            params: {
                characterId: '1'
            }
        },
        history: {
            push: () => {}
        }
    };
    const context = {
        characters: [
            {
                character_id: 1,
                name: 'Name',
                age: '19',
                occupation: 'student',
                role: 'Protagonist',
                interests: 'food',
                personality: 'funny',
                project: 1
            }
        ],
        notes: []
    };
    ReactDOM.render(
        <BrowserRouter>
            <CharaboxContext.Provider value={context}>
                <Character {...props} />
            </CharaboxContext.Provider>
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});