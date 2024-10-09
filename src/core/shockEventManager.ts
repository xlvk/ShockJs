export type ShockEventHandler = EventListener;

// ShockEventManager class to manage events
class ShockEventManager {

    // Private property to store event handlers and selectors
    private events: { [key: string]: Array<{ selector: string | null, handler: Function }> } = {};
    // Private property to store all possible event types
    private eventTypes: string[];

    constructor() {
        // Populate eventTypes with all possible event types derived from the window object
        this.eventTypes = Object.keys(window).filter(key => key.startsWith('on')).map(key => key.substring(2));
        // Automatically set up global listeners
        this.initializeGlobalListeners(); // Automatically set up global listeners
    }

    // Method to set up global event listeners for each event type
    initializeGlobalListeners() {
        this.eventTypes.forEach(eventType => {
            document.documentElement['on' + eventType] = (event) => this.trigger(eventType, event);
        });
    }

    // Method to add event handlers for specific event types and optional CSS selectors
    public on(eventType: string, handler: ShockEventHandler, selector: string | null = null): void {
        if (!this.events[eventType]) {
            this.events[eventType] = [];
        }
        this.events[eventType].push({ selector, handler });
    }

    // Method to remove specific handlers for an event type and selector, if they exist
    public off(eventType: string, handler: ShockEventHandler, selector: string | null = null): void {
        if (!this.events[eventType]) return;

        this.events[eventType] = this.events[eventType].filter(event =>
            event.handler !== handler || event.selector !== selector
        );
    }

    // Method to trigger event handlers when an event occurs
    public trigger(eventType: string, event: Event): void {
        if (!this.events[eventType]) return;
        const target = event.target as HTMLElement;

        // Loop through all the events for the given eventType
        // and check if the selector matches the target
        this.events[eventType].forEach(({ selector, handler }) => {
            if (selector === null || (target && target.matches(selector))) {
                handler(event);
            }
        });
    }
}

// Create and export an instance of ShockEventManager
export const shockEventManager = new ShockEventManager();