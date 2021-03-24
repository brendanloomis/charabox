import React from 'react';
import ReactDOM from 'react-dom';
import AddCharacter from './AddCharacter';

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
    ReactDOM.render(<AddCharacter {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});