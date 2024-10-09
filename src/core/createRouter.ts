import { Router, Route, ShockComponent } from './router';

// The createRouter function is responsible for creating and returning a new instance of the Router class
export function createRouter(routes: Route[]): Router {
    // Create a new instance of the Router class by passing the routes array to its constructor
    return new Router(routes);
}