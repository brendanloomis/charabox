import React from 'react';
import ReactDOM from 'react-dom';
import NoteForm from './NoteForm';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        onSubmit: () => {},
        onCancel: () => {}
    };
    ReactDOM.render(<NoteForm {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});