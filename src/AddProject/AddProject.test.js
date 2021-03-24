import React from 'react';
import ReactDOM from 'react-dom';
import AddProject from './AddProject';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        history: {
            push: () => {},
            goBack: () => {}
        }
    };
    ReactDOM.render(<AddProject {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});