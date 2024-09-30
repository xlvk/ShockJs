import createElement from "./createElement";
import { addShockListener } from "./event";
import { addShockStateListener, dispatchShockStateEvent } from "./state";
import { createRouter } from './createRouter';
import { ShockComponent } from './router';
import  vtodoApp  from "./todo";


// Define your routes
const routes = [
    // { path: '/', component: new ShockComponent('HomeComponent', 'home.html', 'home.ts') },
    { path: '/', component: new ShockComponent('HomeComponent', 'index.html', 'home.ts') },
    { path: '/about', component: new ShockComponent('AboutComponent', 'index.html', 'about.ts') },
    { path: '/todoList', component: new ShockComponent('ContactComponent', 'index.html', 'todo.ts') },
];

routes.push({
    path: '/about',
    component: new ShockComponent('AboutDivComponent', 'aboutDiv.html', 'aboutDiv.ts')
});

// Create the router
const router = createRouter(routes);


// Counter variable
let counter = 0;

// create a div and add 2 buttons
const route_path = window.location.pathname;

let vApp = createElement('div', {
    attrs: { id: 'app' },
    children: [
        createElement('button', {
            attrs: { id: 'shockButton', class: 'shock-button' },
            children: ['Click me for Shock!']
        }),
        createElement('button', {
            attrs: { id: 'shockButton2', class: 'shock-button' },
            children: ['Click me for Shock 2!']
        }),
        createElement('div', {
            attrs: { id: 'counterDisplay' },
            children: ['Counter for Shock: 0']
        }),
        createElement('div', {
            attrs: { id: 'counterDisplay' },
            children: ['Counter for Shock: 0']
        }),
        createElement('div', {
            attrs: { id: 'counterDisplay2' },
            children: ['Counter for Shock 2: 0']
        }),
        // -------------------------------------------------------
        // input testing
        createElement('h1', {
            attrs: { id: 'counterDisplay' },
            children: ['INPUT TEST']
        }),
        createElement('input', {
            attrs: { id: 'textInput', type: 'text', placeholder: 'Enter text here' }
        }),
        createElement('button', {
            attrs: { id: 'enterButton', class: 'enter-button' },
            children: ['Enter']
        }),
        createElement('div', {
            attrs: { id: 'helloWorld' },
            children: ['Hello World']
        }),
        createElement('h2', {
            attrs: { id: "we" },
            children: ["FUCK"]
        }),
        // -------------------------------------------------------
        // checkbox
        createElement('input', {
            attrs: { id: 'checkbox', type: 'checkbox' },
            children: []
        }),
        createElement('label', {
            attrs: { for: 'checkbox' },
            children: ['Click me']
        })
    ]
});

if (route_path == '/about') {
    vApp = createElement('div', {
        attrs: { id: 'aboutDiv' },
        children: ['This is the about div']
    });
}

// the vApp for the todo list
if (route_path == '/todoList') {
    vApp = vtodoApp
}

// Add shock listener to the button
addShockListener('click', (event) => {
    console.log('Shock button clicked!', event);
    dispatchShockStateEvent('stateChange', event);
}, "#shockButton");

addShockListener('click', (event) => {
    console.log('Shock button 2 clicked!', event);
    dispatchShockStateEvent('stateChange', event);
}, "#shockButton2");

// Add shock state listener to the buttons
addShockStateListener('stateChange', (event) => {
    console.log('State changed for Shock button!', event);
    counter++;
    document.getElementById('counterDisplay')!.innerText = `Counter for Shock: ${counter}`;
}, "#shockButton");

addShockStateListener('stateChange', (event) => {
    console.log('State changed for Shock button 2!', event);
    counter++;
    document.getElementById('counterDisplay2')!.innerText = `Counter for Shock 2: ${counter}`;
}, "#shockButton2");


// --------------------
// Add listener to the enter button to change the text of the "Hello World" element
addShockListener('click', (event) => {
    const inputElement = document.getElementById('textInput') as HTMLInputElement;
    const helloWorldElement = document.getElementById('helloWorld');
    if (inputElement && helloWorldElement) {
        helloWorldElement.innerText = inputElement.value;
    }
}, "#enterButton");

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
`;
document.getElementsByTagName('head')[0].appendChild(style);


// Add listener to the checkbox to update its state and change its color
// let isChecked = false;
addShockStateListener('click', (event) => {
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
    filterTodos();
}, '.filters');

// function to filter todos
function filterTodos(filter = 'all') {
    const todoItems = document.querySelectorAll('.todo-list li');
    todoItems.forEach(item => {
        const todo = item.querySelector('.todo-text') as HTMLElement;
        const checkbox = item.querySelector('.toggle') as HTMLInputElement;
        if (filter === 'active' && checkbox.checked) {
            item.classList.add('hidden');
        } else if (filter === 'completed' && !checkbox.checked) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    });
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
    const allChecked = Array.from(todoItems).every(item => (item.querySelector('.toggle') as HTMLInputElement)!.checked);
    todoItems.forEach(item => {
        const checkbox = item.querySelector('.toggle') as HTMLInputElement;
        checkbox.checked = !allChecked;
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
                    createElement('button', { attrs: { class: 'destroy' }, children: ['X'] })
                ]
            }),
            createElement('input', { attrs: { class: 'edit', value: text } })
        ]
    });
    todoList!.appendChild(li);
}

// function toggleTodo(target: HTMLElement) {
//     const li = target.closest('li');
//     li!.classList.toggle('completed');
//     // const checkbox = li!.querySelector('.toggle') as HTMLInputElement;
//     // checkbox.checked = !checkbox.checked;
// }

function toggleTodoById(todoId: string) {
    const todoItem = document.getElementById(todoId);
    console.log('Toggle todo by id:', todoId);
    if (todoItem) {
        todoItem.classList.toggle('completed');
        const checkbox = todoItem.querySelector('.toggle') as HTMLInputElement;
        checkbox.checked = !checkbox.checked;
        // add a tic mark to the checkbox
    }
}

function removeTodo(target: HTMLElement) {
    const li = target.closest('li');
    li!.remove();
}

function clearCompleted() {
    const completedTodos = document.querySelectorAll('.todo-list .completed');
    completedTodos.forEach(todo => todo.remove());
    updateTodoCount();
}

// function filterTodos(filter: string) {
//     const todos = document.querySelectorAll('.todo-list li');
//     todos.forEach(todo => {
//         switch (filter) {
//             case 'active':
//                 (todo as HTMLElement).style.display = todo.classList.contains('completed') ? 'none' : '';
//                 // add a tick mark to the checkbox
//                 // const checkbox = todo.querySelector('.toggle') as HTMLInputElement;
//                 break;
//             case 'completed':
//                 (todo as HTMLElement).style.display = todo.classList.contains('completed') ? '' : 'none';
//                 // add a tick mark to the checkbox
//                 // const checkbox = todo.querySelector('.toggle') as HTMLInputElement;
//                 // checkbox.checked = true;
                
//                 break;
//             default:
//                 (todo as HTMLElement).style.display = '';
//         }
//     });
//     updateFilterSelection(filter);
// }

// const style = document.createElement('style');
// style.type = 'text/css';
// style.innerHTML = `
//     .completed {
//         background-color: lightgray;
//     }
// `;
// document.getElementsByTagName('head')[0].appendChild(style);

// function filterTodos(filter: string) {
//     const todos = document.querySelectorAll('.todo-list li');
//     todos.forEach(todo => {
//         const isCompleted = todo.classList.contains('completed');
//         switch (filter) {
//             case 'active':
//                 (todo as HTMLElement).style.display = isCompleted ? 'none' : '';
//                 break;
//             case 'completed':
//                 (todo as HTMLElement).style.display = isCompleted ? '' : 'none';
//                 break;
//             default:
//                 (todo as HTMLElement).style.display = '';
//         }
//         // Toggle the completed class based on the completion status
//         if (isCompleted) {
//             todo.classList.add('completed');
//         } else {
//             todo.classList.remove('completed');
//         }
//     });
// }

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

export default vApp;
