import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Note from './Note';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        note_id: 1,
        note: 'this is the note',
        characterId: '1',
        projectId: '1'
    };
    ReactDOM.render(
        <BrowserRouter>
            <Note {...props} />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});