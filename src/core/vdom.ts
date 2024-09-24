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


const vApp = createElement('button', {
    attrs: { id: 'shockButton', class: 'shock-button' },
    children: ['Click me for Shock!']
});

// Add shock listener to the button
addShockListener('ShockHandler', (event) => {
    console.log('Shock button clicked!', event);
    // You can add more custom logic here
});

export default vApp;
