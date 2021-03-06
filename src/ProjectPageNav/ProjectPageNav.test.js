import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ProjectPageNav from './ProjectPageNav';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        projectId: '1'
    };
    ReactDOM.render(
        <BrowserRouter>
            <ProjectPageNav {...props} />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});