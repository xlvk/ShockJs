import { s as createElement } from './shock_dom';

// test for what to add.
const oldVNode = createElement('div', { id: 'container' }, createElement('h1', {}, 'Hello, world!'));
const newVNode = createElement('div', { id: 'container' }, createElement('h1', {}, 'Hello, Virtual DOM!'));

const root = document.getElementById('root')!;