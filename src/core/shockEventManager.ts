export type ShockEventHandler = EventListener;


class ShockEventManager {
    private events: { [key: string]: Array<{ selector: string | null, handler: Function }> } = {};
    private eventTypes: string[];
    
    constructor() {
        this.eventTypes = Object.keys(window).filter(key => key.startsWith('on')).map(key => key.substring(2));
        this.initializeGlobalListeners(); // Automatically set up global listeners
    }

    initializeGlobalListeners() {
        this.eventTypes.forEach(eventType => {
            document.documentElement['on' + eventType] = (event) => this.trigger(eventType, event);
        });
    }

    public on(eventType: string, handler: ShockEventHandler, selector: string | null = null): void {
        if (!this.events[eventType]) {
            this.events[eventType] = [];
        }
        this.events[eventType].push({ selector, handler });
    }

    public off(eventType: string, handler: ShockEventHandler, selector: string | null = null): void {
        if (!this.events[eventType]) return;

        this.events[eventType] = this.events[eventType].filter(event => 
            event.handler !== handler || event.selector !== selector
        );
    }

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

export const shockEventManager = new ShockEventManager();