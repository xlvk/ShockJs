import createElement from "./createElement";
// import { addShockListener } from "./event";
// import { addShockStateListener, dispatchShockStateEvent } from "./state";
// import { createRouter } from './createRouter';
// import { ShockComponent } from './router';

let vtodoApp = createElement('div', {
    // the items for the todo list
    attrs: { id: 'todoapp' },
    children: [
        createElement('header', {
            attrs: { class: 'header' },
            children: [
                createElement('h1', { children: ['todos'] }),
                createElement('input', {
                    attrs: {
                        id: 'new-todo',
                        class: 'new-todo',
                        placeholder: 'What needs to be done?',
                        autofocus: ''
                    }
                })
            ]
        }),
        createElement('section', {
            attrs: { class: 'main' },
            children: [
                createElement('input', {
                    attrs: { id: 'toggle-all', class: 'toggle-all', type: 'checkbox' }
                }),
                createElement('label', { attrs: { for: 'toggle-all' }, children: ['Mark all as complete'] }),
                createElement('ul', { attrs: { class: 'todo-list' } })
            ]
        }),
        createElement('footer', {
            attrs: { class: 'footer' },
            children: [
                createElement('span', { attrs: { class: 'todo-count' }, children: ['0 items left'] }),
                createElement('ul', {
                    attrs: { class: 'filters' },
                    children: [
                        createElement('li', {
                            children: [createElement('a', { attrs: { href: '#/', class: 'selected' }, children: ['All'] })]
                        }),
                        createElement('li', {
                            children: [createElement('a', { attrs: { href: '#/active' }, children: ['Active'] })]
                        }),
                        createElement('li', {
                            children: [createElement('a', { attrs: { href: '#/completed' }, children: ['Completed'] })]
                        })
                    ]
                }),
                createElement('button', { attrs: { class: 'clear-completed' }, children: ['Clear completed'] })
            ]
        })
    ]
});

export default vtodoApp;