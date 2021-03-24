import React from 'react';
import ReactDOM from 'react-dom';
import EditProject from './EditProject';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        history: {
            push: () => {},
            goBack: () => {}
        },
        match: {
            params: {}
        }
    };
    ReactDOM.render(<EditProject {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});