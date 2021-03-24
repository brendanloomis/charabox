import React from 'react';
import ReactDOM from 'react-dom';
import Project from './Project';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        project_type: 'Movie',
        project_name: 'My Movie'
    };
    ReactDOM.render(<Project {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});