import { shockEventManager } from './shockEventManager';

// New shockListener using onClick
export function shockListener(event: MouseEvent) {
    // Prevent default action
    event.preventDefault();

    // Stop propagation
    event.stopPropagation();

    // Custom handling logic
    console.log('Shock event triggered:', event);

    // Trigger custom event
    shockEventManager.trigger('ShockHandler', event);
}

// Custom addShockListener function
export function addShockListener(eventType: string, handler: (event: MouseEvent) => void): void {
    shockEventManager.on(eventType, handler);
}

export function removeShockListener(eventType: string, handler: (event: MouseEvent) => void): void {
    shockEventManager.off(eventType, handler);
}

export function dispatchShockEvent(eventType: string, event: MouseEvent): void {
    shockEventManager.trigger(eventType, event);
}

// Example usage
addShockListener('ShockHandler', (event) => {
    console.log('Custom ShockHandler event handled:', event);
});

removeShockListener('click', shockListener);

// Attach the shockListener to the click event
document.onclick = shockListener;

export function ShockTarget() {
    // Add event listener
    addShockListener('click', shockListener);
}