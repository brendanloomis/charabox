import React from 'react';
import ReactDOM from 'react-dom';
import EditNote from './EditNote';

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
    ReactDOM.render(<EditNote {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});