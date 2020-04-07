import React from 'react';
import {render} from 'react-dom';
import App from './app';
import themes from './data/themes';

const root = document.createElement('div');
document.body.append(root);

render(<App themes={themes} />, root);
