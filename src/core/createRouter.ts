import { Router, Route, ShockComponent } from './router';
// import { ShockComponent } from './shockEventManager';

export function createRouter(routes: Route[]): Router {
    return new Router(routes);
}