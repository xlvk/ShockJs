import vTodo from './todo';
import vTest from "./test";
import vHome from './home';
import createElement, { loadCSS } from "../src/core/createElement";
import VAppManager from "../src/core/vdom";
import { createRouter } from '../src/core/createRouter';
import { ShockComponent } from '../src/core/router';


const vAppManager = VAppManager.getInstance();

// create a div and add 2 buttons
const route_path = window.location.pathname;

// Define your routes
const routes = [
    { path: '/test', component: new ShockComponent('TestComponent', 'index.html', 'test.ts') },
    { path: '/about', component: new ShockComponent('AboutComponent', 'index.html', 'about.ts') },
    { path: '/todoList', component: new ShockComponent('ContactComponent', 'index.html', 'todo.ts') },
];

routes.push({
    path: '/about',
    component: new ShockComponent('AboutDivComponent', 'aboutDiv.html', 'aboutDiv.ts')
});


// Create the router
const router = createRouter(routes);



let vApp: HTMLElement;

// the vApp for the todo list
if (route_path == '/') {
    vApp = vHome;
    loadCSS('home.css');
} else if (route_path == '/test') {
    vApp = vTest;
    loadCSS('test.css');
} else if (route_path == '/todoList') {
    vApp = vTodo;
    loadCSS('todo.css');
} else {
    vAppManager.setVApp(
        createElement('div', {
            attrs: { id: 'notFound' },
            children: ['404 - Page Not Found']
        })
    )
    vApp = createElement('div', {
        attrs: { id: 'notFound' },
        children: ['404 - Page Not Found']
    });
}

export function getVApp(): HTMLElement {
    return vApp;
}

vAppManager.setVApp(vApp);

export { vApp };