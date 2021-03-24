import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CharaboxContext from '../CharaboxContext';
import ProjectOverview from './ProjectOverview';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        history: {
            push: () => {}
        },
        match: {
            params: {
                projectId: 1
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
        ]
    };
    ReactDOM.render(
        <BrowserRouter>
            <CharaboxContext.Provider value={context}>
                <ProjectOverview {...props} />
            </CharaboxContext.Provider>
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});