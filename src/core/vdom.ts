import createElement from "./createElement";
import { addShockListener } from "./event";
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
        })
    ]
});

// Add shock listener to the button
addShockListener('click', (event) => {
    console.log('Shock button clicked!', event);
}, "#shockButton");

addShockListener('click', (event) => {
    console.log('Shock button 2 clicked!', event);
}, "#shockButton2");


export default vApp;
