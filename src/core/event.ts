import { shockEventManager, ShockEventHandler } from './shockEventManager';

// New shockListener using onClick
export function shockListener(event: Event) {
    // Prevent default action
    event.preventDefault();

    // Stop propagation
    event.stopPropagation();

    // Trigger custom event
    shockEventManager.trigger('ShockHandler', event);
}

// Custom addShockListener function
export function addShockListener(eventType: string, handler: ShockEventHandler, selector: string | null = null): void {
    shockEventManager.on(eventType, handler, selector);
}


export function removeShockListener(eventType: string, handler: ShockEventHandler, selector: string | null = null): void {
    shockEventManager.off(eventType, handler, selector);
}

export function dispatchShockEvent(eventType: string, event: Event): void {
    shockEventManager.trigger(eventType, event);
}


export function ShockTarget() {
    // Add event listener
    addShockListener('click', shockListener);
}


// Extend the Document interface to include addShockListener
declare global {
    interface Document {
        addShockListener(eventType: string, handler: ShockEventHandler, selector?: string | null): void;
    }
}

// Implement the addShockListener method on the document
document.addShockListener = addShockListener;