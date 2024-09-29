import createElement from "./createElement";
import { addShockListener } from "./event";
import { addShockStateListener, dispatchShockStateEvent } from "./state";
import { createRouter } from './createRouter';
import { ShockComponent } from './router';

// Define your routes
const routes = [
    // { path: '/', component: new ShockComponent('HomeComponent', 'home.html', 'home.ts') },
    { path: '/', component: new ShockComponent('HomeComponent', 'home.html', 'home.ts') },
    { path: '/about', component: new ShockComponent('AboutComponent', 'about.html', 'about.ts') },
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
const vApp = createElement('div', {
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
            attrs: { id: 'counterDisplay2' },
            children: ['Counter for Shock 2: 0']
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


export default vApp;
