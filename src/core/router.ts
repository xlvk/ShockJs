import * as Handlebars from 'handlebars';

// change this later
// declare const ejs: any;

/**
 * The `BaseComponent` represents a Base component from which all other components are registered
 * Keep in mind it is NOT representative of an `HTMLElement` instance
 *
 * @property `data` - data to be rendered on the template
 * @property `htmlPath` - path to a html template
 * @property `tsPath` - path to the associated ts controller
 * @property `children` - any child components of the same class
 */
class BaseComponent {
    data = {};
    children: BaseComponent[] = [];
    htmlPath = "";
    tsPath = "";
    name = "";
    eventTarget: EventTarget;

    constructor(
        name: string,
        htmlPath: string,
        tsPath: string,
        data?: {} | undefined,
        children?: BaseComponent[] | undefined
    ) {
        this.data = data || {};
        this.children = children || [];
        this.htmlPath = htmlPath;
        this.tsPath = tsPath;
        this.name = name;
        this.eventTarget = new EventTarget();
    }

    async render() {
        try {
            const response = await fetch(this.htmlPath);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${response.statusText}`);
            }

            let renderedHtml = await response.text();

            // Render child components recursively
            for (const child of this.children) {
                const childPlaceholder = `#${child.name}#`;
                const childRenderedHtml = await child.render();
                renderedHtml = renderedHtml.replace(
                    childPlaceholder,
                    childRenderedHtml
                );
            }

            const template = Handlebars.compile(renderedHtml);
            renderedHtml = template(this.data);

            return renderedHtml;
        } catch (error) {
            console.error("Error rendering template:", error);
            throw error;
        }
    }

    /**
     * This function will Inject the element to DOM post-rendering
     * @param selector - element to render under
     */
    async InjectToDOM(selector: any) {
        try {
            const renderedTemplate = await this.render();
            const element = document.querySelector(selector);

            if (element) {
                element.innerHTML = renderedTemplate;
                this.ExecTS();
                if (this.children.length) {
                    for (const child of this.children) {
                        child.ExecTS();
                    }
                }
            } else {
                console.error(`Element with selector ${selector} not found`);
            }
        } catch (error) {
            console.error("Error rendering to DOM:", error);
        }
    }

    /**
     * Loads and executes a TS script for the component
     *
     * @param tsPath - Path to TS file
     */
    ExecTS() {
        const script = document.createElement("script");
        script.src = this.tsPath;
        script.onload = () => console.log(`${this.tsPath} loaded and executed.`);
        script.onerror = () =>
            console.error(`Failed to load script ${this.tsPath}`);
        document.body.appendChild(script);
    }

    /**
     * Adds a child component to the current component
     * @param child - Child component to add
     */
    addChild(child: BaseComponent) {
        this.children.push(child);
    }

    /**
     * Adds an event listener to the component
     * @param type - Event type
     * @param listener - Event listener
     */
    addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
        this.eventTarget.addEventListener(type, listener);
    }

    /**
     * Dispatches an event from the component
     * @param event - Event to dispatch
     */
    dispatchEvent(event: Event) {
        this.eventTarget.dispatchEvent(event);
    }

    /**
     * Removes an event listener from the component
     * @param type - Event type
     * @param listener - Event listener
     */
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
        this.eventTarget.removeEventListener(type, listener);
    }
}

export { BaseComponent };

export interface Route {
  path: string;
  component: BaseComponent;
}

/**
 * The `router` class represents the main routing mechanism
 * There should always be one instance of it for centralized route management
 */
export class Router {
  routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;
    this.handleRoute = this.handleRoute.bind(this);
  }

  /**
   * The handleroute function will invoke the rendering of a component
   * and its children should the URL change
   */
  handleRoute() {
    const currentPath = window.location.pathname;
    const route = this.routes.find((route) => route.path === currentPath);

    if (route) {
      this.renderComponent(route.component);
    } else {
      this.renderNotFound();
    }
  }

  /**
   * `renderComponent` will inject the component, with its children, into the DOM
   *
   * @param component the component to be rendered
   */
  renderComponent(component: BaseComponent) {
    const appElement = document.getElementById("app");
    if (appElement) {
      appElement.innerHTML = "";
      component.InjectToDOM("#app");
    }
  }

  renderNotFound() {
    const appElement = document.getElementById("app");
    if (appElement) {
      appElement.innerHTML = "<h1>404 - Not Found</h1>";
    }
  }

  navigateTo(path: string) {
    window.history.pushState({}, path, window.location.origin + path);
    this.handleRoute();
  }

  addRoute(r: Route) {
    this.routes.push(r);
  }
}