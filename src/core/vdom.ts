import createElement from "./createElement";
import { addShockListener } from "./event";
import { addShockStateListener, dispatchShockStateEvent } from "./state";
import { createRouter } from './createRouter';
import { ShockComponent } from './router';

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
            attrs: { id: "we"},
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
    vApp = createElement('div', {
        // the items for the todo list
        attrs: { id: 'todoList' },
        children: [
            createElement('input', {
                attrs: { id: 'todoInput', type: 'text', placeholder: 'Enter todo here' }
            }),
            createElement('button', {
                    attrs: { id: 'addButton', class: 'add-button' },
                    children: ['Add']
                }),
            createElement('ul', {
                attrs: { id: 'todoList' },
                children: []
            })
        ]
    });
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
`;
document.getElementsByTagName('head')[0].appendChild(style);


// Add listener to the checkbox to update its state and change its color
let isChecked = false;
addShockStateListener('click', (event) => {
    const checkbox = document.getElementById('checkbox') as HTMLInputElement;
    const label = document.querySelector('label[for="checkbox"]');
    // console.log('Checkbox clicked!', isChecked);
    checkbox.checked = !checkbox.checked;
    isChecked = !isChecked;
    console.log('Checkbox clicked after!', isChecked);
    if (checkbox) {
        if (checkbox.checked || isChecked) {
            checkbox.classList.add('checked');
        } else {
            checkbox.classList.remove('checked');
        }
        console.log(`Checkbox is now ${isChecked ? 'checked' : 'unchecked'}`);
    }
    if (label) {
        if (isChecked) {
            label.classList.add('checked');
        } else {
            label.classList.remove('checked');
        }
    }
    // console.log('Checkbox clicked!', checkbox.checked);
}, "#checkbox");



export default vApp;
