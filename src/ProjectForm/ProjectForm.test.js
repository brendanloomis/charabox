import React from 'react';
import ReactDOM from 'react-dom';
import ProjectForm from './ProjectForm';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        onSubmit: () => {},
        onCancel: () => {}
    };
    ReactDOM.render(<ProjectForm {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});