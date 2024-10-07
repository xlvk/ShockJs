import vApp from "./core/vdom";
import mount from "./core/mount";
// just was checking if typescript is working or not
console.log(`Server running`);

mount(document.getElementById('app'), vApp);

console.log('vdom', vApp);

