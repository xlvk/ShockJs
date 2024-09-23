type ShockEventHandler = (event: MouseEvent) => void;

class ShockEventManager {
    private handlers: { [key: string]: ShockEventHandler[] } = {};

    public on(eventType: string, handler: ShockEventHandler): void {
        if (!this.handlers[eventType]) {
            this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler);
    }

    public off(eventType: string, handler: ShockEventHandler): void {
        if (!this.handlers[eventType]) return;
        this.handlers[eventType] = this.handlers[eventType].filter(h => h !== handler);
    }

    public trigger(eventType: string, event: MouseEvent): void {
        if (!this.handlers[eventType]) return;
        this.handlers[eventType].forEach(handler => handler(event));
    }
}

export const shockEventManager = new ShockEventManager();