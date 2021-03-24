import React from 'react';
import ReactDOM from 'react-dom';
import CharacterForm from './CharacterForm';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        onSubmit: () => {},
        onCancel: () => {}
    }
    ReactDOM.render(<CharacterForm {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});