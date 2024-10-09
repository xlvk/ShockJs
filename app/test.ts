import createElement from "../src/core/createElement";
import { addShockListener } from "../src/core/event";
import { addShockStateListener, dispatchShockStateEvent } from "../src/core/state";

let vTest = createElement('div', {
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


// Add shock listener to the button
addShockListener('click', (event) => {
    console.log('Shock button clicked!', event);
    dispatchShockStateEvent('stateChange', event);
}, "#shockButton");

addShockListener('click', (event) => {
    console.log('Shock button 2 clicked!', event);
    dispatchShockStateEvent('stateChange', event);
}, "#shockButton2");


// Counter variable
let counter = 0;

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



export default vTest;