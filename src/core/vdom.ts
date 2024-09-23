import createElement from "./createElement";
import { addShockListener } from "./event";

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
