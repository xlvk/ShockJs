import createElement from "./createElement";
import { vApp } from "../../app/main";

// singleton class to manage the vApp
class VAppManager {
    private static instance: VAppManager;
    private vApp: Element | null = null;

    private constructor() {}

    public static getInstance(): VAppManager {
        if (!VAppManager.instance) {
            VAppManager.instance = new VAppManager();
        }
        return VAppManager.instance;
    }

    public setVApp(newVApp: Element): void {
        this.vApp = newVApp;
    }

    public getVApp(): Element | null {
        return this.vApp;
    }
}

// export the vApp to use it in other files
let vAppElements: Element | undefined;

// if the vApp is undefined, then create a div with 404 - Page Not Found
const vAppManager = VAppManager.getInstance();
if (vApp === undefined) {
    vAppElements = createElement('div', {
        attrs: { id: 'notFound' },
        children: ['404 - Page Not Found']
    });
    vAppManager.setVApp(vAppElements);
} else {
    vAppElements = vApp;
}

// export the vAppManager and vAppElements
export { vAppElements };

export default VAppManager;
