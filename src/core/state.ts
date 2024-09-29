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
export function addShockStateListener(eventType: string, handler: ShockEventHandler, selector: string | null = null): void {
    shockEventManager.on(eventType, handler, selector);
}

export function removeShockStateListener(eventType: string, handler: ShockEventHandler, selector: string | null = null): void {
    shockEventManager.off(eventType, handler, selector);
}

export function dispatchShockStateEvent(eventType: string, event: Event): void {
    shockEventManager.trigger(eventType, event);
}

export function ShockStateTarget() {
    // Add state event listener
    addShockStateListener('stateChange', shockStateListener);
}