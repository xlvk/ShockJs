import vTodo from './todo';
import vHome from "./home";
import createElement from "../src/core/createElement";
import VAppManager from "../src/core/vdom";
import { createRouter } from '../src/core/createRouter';
import { ShockComponent } from '../src/core/router';


const vAppManager = VAppManager.getInstance();

// create a div and add 2 buttons
const route_path = window.location.pathname;

// Define your routes
const routes = [
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



let vApp: Element;

// the vApp for the todo list
if (route_path == '/') {
    vApp = vHome;
} else if (route_path == '/todoList') {
    vApp = vTodo;
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

export function getVApp(): Element {
    return vApp;
}

vAppManager.setVApp(vApp);

export { vApp };