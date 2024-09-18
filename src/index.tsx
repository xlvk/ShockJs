import { s as createElement } from './shock_dom';
import { render } from './render';
// test for what to add.
const oldVNode = createElement('div', { id: 'container' }, createElement('h1', {}, 'Hello, world!'));
const newVNode = createElement('div', { id: 'container' }, createElement('h1', {}, 'Hello, Virtual DOM!'));

const root = document.getElementById('root')!;
root.appendChild(render(oldVNode));