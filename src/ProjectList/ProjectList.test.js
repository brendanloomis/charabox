import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ProjectList from './ProjectList';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <ProjectList />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});