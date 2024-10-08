// import { vAppElements } from "./core/vdom";
import { vApp } from "../app/main";
import mount from "./core/mount";
// just was checking if typescript is working or not
console.log(`Server running`);

let $rootEl = mount(document.getElementById('app'), vApp);


console.log('vdom', vApp);
