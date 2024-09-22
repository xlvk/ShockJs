import createElement from "./createElement";

const vApp = createElement('div', {
    attrs: {
        id: 'app'
    },
    children: ['Hard coded VDOM']
});

export default vApp;
