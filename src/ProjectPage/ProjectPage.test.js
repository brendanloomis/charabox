import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CharaboxContext from '../CharaboxContext';
import ProjectPage from './ProjectPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        match: {
            params: {
                projectId: '1'
            }
        }
    };
    const context = {
        projects: [
            {
                project_id: 1,
                project_name: 'My project',
                project_type: 'Movie',
                project_summary: 'My Movie'
            }
        ],
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
        ]
    }
    ReactDOM.render(
        <BrowserRouter>
            <CharaboxContext.Provider value={context}>
                <ProjectPage {...props} />
            </CharaboxContext.Provider>
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});