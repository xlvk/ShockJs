import createElement from "./createElement";

const vApp = createElement('div', {
    attrs: {
        id: 'app'
    },
    children: ['Hello world']
});

export default vApp;
