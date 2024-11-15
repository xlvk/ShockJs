import createElement from "../src/core/createElement";
import { addShockListener } from "../src/core/event";
import { addShockStateListener } from "../src/core/state";

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
                            children: [createElement('a', { attrs: { href: '#/', class: 'selected fil' }, children: ['All'] })]
                        }),
                        createElement('li', {
                            children: [createElement('a', { attrs: { href: '#/active', class: 'fil' }, children: ['Active'] })]
                        }),
                        createElement('li', {
                            children: [createElement('a', { attrs: { href: '#/completed', class: 'fil' }, children: ['Completed'] })]
                        })
                    ]
                }),
                createElement('button', { attrs: { class: 'clear-completed' }, children: ['Clear completed'] })
            ]
        })
    ]
});


// Add the CSS class dynamically
const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    .checked {
        background-color: lightgreen;
    }
    .completed {
        background-color: lightgray;
    }
    .hidden {
        display: none;
    }
`;
document.getElementsByTagName('head')[0]?.appendChild(style);


// Add listener to the checkbox to update its state and change its color
// let isChecked = false;
addShockStateListener('click', () => {
    const checkbox = document.getElementById('checkbox') as HTMLInputElement;
    const label = document.querySelector('label[for="checkbox"]');
    console.log('Checkbox clicked!', checkbox.checked);
    // checkbox.checked = !checkbox.checked;
    // isChecked = !isChecked;
    console.log('Checkbox clicked after!', checkbox.checked);
    if (checkbox) {
        if (checkbox.checked) {
            checkbox.classList.add('checked');
        } else {
            checkbox.classList.remove('checked');
        }
        console.log(`Checkbox is now ${checkbox.checked ? 'checked' : 'unchecked'}`);
    }
    if (label) {
        if (checkbox.checked) {
            label.classList.add('checked');
        } else {
            label.classList.remove('checked');
        }
    }
    // // console.log('Checkbox clicked!', checkbox.checked);
}, "#checkbox");



// Add event listeners for todo functionality
addShockListener('keypress', (event) => {
    if ((event as KeyboardEvent).key === 'Enter') {
        const input = event.target as HTMLInputElement;
        const todoText = input.value.trim();
        if (todoText) {
            addTodo(todoText);
            input.value = '';
            updateTodoCount();
        }
    }
}, '#new-todo');

addShockListener('click', (event) => {
    const target = event.target as HTMLElement;
    console.log('Target:', target);
    if (target.classList.contains('toggle')) {
        console.log('Toggle clicked!');
        const todoId = target.closest('li')!.id;
        toggleTodoById(todoId);
        updateTodoCount();
    } else if (target.classList.contains('destroy')) {
        console.log('Destroy clicked!');
        removeTodo(target);
        updateTodoCount();
    }
}, '.toggle');




addShockListener('click', () => {
    clearCompleted();
    updateTodoCount();
    console.log('Clear completed clicked!');
}, '.clear-completed');


// the destroy button
addShockListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('destroy')) {
        removeTodo(target);
        updateTodoCount();
    }
}, '.destroy');

addShockListener('click', (event) => {
    const target = event.target as HTMLElement;
    console.log('Filter:', target);
    if (target.tagName === 'A') {
        filterTodos(target.getAttribute('href')!.slice(2));
    }
    // the currnt todos will be filtered
    filterTodos(target.getAttribute('href')!.slice(2));
    // console.log('Filter clicked!', target.getAttribute('href')!.slice(2));
}, '.fil');

// function to filter todos
function filterTodos(filter: any) {
    // if (filter === '') {
    //     filter = 'all';
    //     document.querySelectorAll('.todo-list li').forEach(todo => todo.classList.remove('hidden'));
    // }
    const todoItems = document.querySelectorAll('.todo-list li');
    todoItems.forEach(item => {
        console.log('does it have the class completed?', item.classList.contains('completed'), item);
        if (filter === 'active' && item.classList.contains('completed')) {
            item.classList.add('hidden');
        } else if (filter === 'completed' && !item.classList.contains('completed')) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    });

    // Update filter selection
    updateFilterSelection(filter);
}



// toggle all will make all todos checked or unchecked
addShockListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('toggle-all')) {
        toggleAll();
        updateTodoCount();
    }
}, '.toggle-all');

// listener for the edit input
addShockListener('keypress', (event) => {
    if ((event as KeyboardEvent).key === 'Enter') {
        const input = event.target as HTMLInputElement;
        const todoText = input.value.trim();
        if (todoText) {
            const li = input.closest('li');
            if (li) {
                const label = li.querySelector('label');
                if (label) {
                    label.textContent = todoText;
                }
                li.classList.remove('editing');
            }
        }
    }
}, '.edit');


// toggleAll function
function toggleAll() {
    const todoItems = document.querySelectorAll('.todo-list li');
    console.log('Toggle all clicked!');
    const allChecked = (document.getElementById('toggle-all') as HTMLInputElement).checked;
    todoItems.forEach(item => {
        const checkbox = item.querySelector('.toggle') as HTMLInputElement;
        checkbox.checked = allChecked;
        // add the class completed to the todo item if the checkbox is checked
        if (checkbox.checked) {
            item.classList.add('completed');
        } else {
            item.classList.remove('completed');
        }
    });
}


let todoCounter = 0;

// Helper functions for todo functionality
function addTodo(text: string) {
    const todoList = document.querySelector('.todo-list');
    const todoId = `todo-${todoCounter++}`;
    const li = createElement('li', {
        attrs: { id: todoId },
        children: [
            createElement('div', {
                attrs: { class: 'view' },
                children: [
                    createElement('input', { attrs: { class: 'toggle', type: 'checkbox' } }),
                    createElement('label', { children: [text] }),
                    createElement('button', { attrs: { class: 'destroy' }, children: [''] })
                ]
            }),
            createElement('input', {
                attrs: { class: 'edit', value: text },
                events: {
                    keydown: (event: Event) => {
                        const keyboardEvent = event as KeyboardEvent;
                        if (keyboardEvent.key === 'Enter') {
                            const input = keyboardEvent.target as HTMLInputElement;
                            const li = input.closest('li');
                            if (li) {
                                li.classList.remove('editing');
                                const label = li.querySelector('label');
                                if (label) {
                                    label.textContent = input.value;
                                }
                            }
                        }
                    },
                    blur: (event: Event) => {
                        const input = event.target as HTMLInputElement;
                        const li = input.closest('li');
                        if (li) {
                            li.classList.remove('editing');
                            const label = li.querySelector('label');
                            if (label) {
                                label.textContent = input.value;
                            }
                        }
                    }
                }
            })
        ]
    });
    todoList!.appendChild(li);
    enableEditingOnDblClick();
    saveOrResetTodoTextOnBlur();
}

function enableEditingOnDblClick() {
    const todoItems = document.querySelectorAll('.todo-list li');
    todoItems.forEach(item => {
        const label = item.querySelector('label');
        if (label) {
            label.addEventListener('dblclick', () => {
                item.classList.add('editing');
                const input = item.querySelector('.edit') as HTMLInputElement;
                if (input) {
                    input.focus();
                }
            });
        }
    });
}

function saveOrResetTodoTextOnBlur() {
    const todoItems = document.querySelectorAll('.todo-list li');
    todoItems.forEach(item => {
        const input = item.querySelector('.edit') as HTMLInputElement;
        let enterPressed = false;

        if (input) {
            input.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                    enterPressed = true;
                    item.classList.remove('editing');
                    const label = item.querySelector('label');
                    if (label) {
                        label.textContent = input.value;
                    }
                }
            });

            input.addEventListener('blur', () => {
                if (!enterPressed) {
                    item.classList.remove('editing');
                    const label = item.querySelector('label');
                    if (label) {
                        label.textContent = input.defaultValue;
                    }
                }
                enterPressed = false; // Reset the flag
            });
        }
    });
}

function toggleTodoById(todoId: string) {
    const todoItem = document.getElementById(todoId);
    console.log('Toggle todo by id:', todoId);
    if (todoItem) {
        todoItem.classList.toggle('completed');
    }
}

function removeTodo(target: HTMLElement) {
    const li = target.closest('li');
    li!.remove();
}

function clearCompleted() {
    const completedTodos = document.querySelectorAll('.todo-list .completed');
    console.log('Completed todos:', completedTodos); // Debug log
    completedTodos.forEach(todo => todo.remove());
    updateTodoCount();
}



function updateFilterSelection(filter: string) {
    const filterLinks = document.querySelectorAll('.filters a');
    filterLinks.forEach(link => {
        link.classList.toggle('selected', link.getAttribute('href') === `#/${filter}`);
    });
}

function updateTodoCount() {
    const count = document.querySelectorAll('.todo-list li:not(.completed)').length;
    const todoCount = document.querySelector('.todo-count');
    todoCount!.textContent = `${count} item${count !== 1 ? 's' : ''} left`;
}


export default vtodoApp;