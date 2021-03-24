import React from 'react';
import ReactDOM from 'react-dom';
import EditCharacter from './EditCharacter';

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
    ReactDOM.render(<EditCharacter {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});