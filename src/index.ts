// import { vAppElements } from "./core/vdom";
import { vApp } from "../app/main";
import createElement from "./core/createElement";
import mount from "./core/mount";
// just was checking if typescript is working or not
console.log(`Server running`);

mount(document.getElementById('app') || createElement("div", {}), vApp);


console.log('vdom', vApp);
