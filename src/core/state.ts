import { shockEventManager, ShockEventHandler } from './shockEventManager';

// New shockStateListener using onStateChange
export function shockStateListener(event: Event) {
    // Prevent default action
    event.preventDefault();

    // Stop propagation
    event.stopPropagation();

    // Trigger custom state event
    shockEventManager.trigger('ShockStateHandler', event);
}

// Custom addShockStateListener function
// Allows adding custom state event listeners
export function addShockStateListener(eventType: string, handler: ShockEventHandler, selector: string | null = null): void {
    shockEventManager.on(eventType, handler, selector);
}

// Custom removeShockStateListener function
// Enables the removal of custom state event listeners
export function removeShockStateListener(eventType: string, handler: ShockEventHandler, selector: string | null = null): void {
    shockEventManager.off(eventType, handler, selector);
}

// Custom dispatchShockStateEvent function
// Used to manually trigger custom state events
export function dispatchShockStateEvent(eventType: string, event: Event): void {
    shockEventManager.trigger(eventType, event);
}

// ShockStateTarget function
// Sets up a state change event listener
export function ShockStateTarget() {
    // Add state event listener
    addShockStateListener('stateChange', shockStateListener);
}