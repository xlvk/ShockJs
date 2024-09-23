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

// Example usage
addShockListener('ShockHandler', (event) => {
    console.log('Custom ShockHandler event handled:', event);
});

// Attach the shockListener to the click event
document.onclick = shockListener;