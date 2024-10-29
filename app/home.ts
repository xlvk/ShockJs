import createElement from "../src/core/createElement";
import { addShockListener } from "../src/core/event";

let vHome = createElement('div', {
    attrs: {
        id: 'app',
        class: 'min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4 md:p-8'
    },
    children: [
        createElement('div', {
            attrs: {
                class: 'w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden'
            },
            children: [
                createElement('div', {
                    attrs: { class: 'p-8 md:p-12' },
                    children: [
                        // Logo
                        createElement('div', {
                            attrs: { class: 'flex justify-center mb-8' },
                            children: [
                                createElement('svg', {
                                    attrs: {
                                        xmlns: 'http://www.w3.org/2000/svg',
                                        width: '64',
                                        height: '64',
                                        viewBox: '0 0 24 24',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        'stroke-width': '2',
                                        'stroke-linecap': 'round',
                                        'stroke-linejoin': 'round',
                                        class: 'w-16 h-16 text-indigo-600'
                                    },
                                    children: [
                                        createElement('path', {
                                            attrs: { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' }
                                        })
                                    ]
                                })
                            ]
                        }),
                        // Welcome Message
                        createElement('h1', {
                            attrs: { class: 'text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4' },
                            children: ['New ShockJS App']
                        }),
                        createElement('p', {
                            attrs: { class: 'text-xl text-center text-gray-600 mb-8' },
                            children: ['This is your custom app built with SHOCK! Get started by editing home.ts']
                        }),
                        // Buttons
                        createElement('div', {
                            attrs: { class: 'flex flex-col sm:flex-row justify-center gap-4 mb-12' },
                            children: [
                                createElement('button', {
                                    attrs: {
                                        class: 'px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold flex items-center justify-center',
                                        id: 'getStarted'
                                    },
                                    children: [
                                        'Get Started',
                                    ]
                                }),
                                createElement('button', {
                                    attrs: {
                                        class: 'px-6 py-3 bg-gray-200 text-gray-800 rounded-full font-semibold flex items-center justify-center',
                                        id: 'learnMore'
                                    },
                                    children: [
                                        'Learn More',
                                    ]
                                }),
                                createElement('button', {
                                    attrs: {
                                        class: 'px-6 py-3 bg-gray-200 text-gray-800 rounded-full font-semibold flex items-center justify-center',
                                        id: 'todoList'
                                    },
                                    children: [
                                        'Todo List MVC',
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                // Extra Content
                createElement('div', {
                    attrs: { class: 'bg-gray-50 p-8 md:p-12' },
                    children: [
                        createElement('h2', {
                            attrs: { class: 'text-2xl md:text-3xl font-semibold text-gray-800 mb-4' },
                            children: ['Additional Features']
                        }),
                        createElement('p', {
                            attrs: { class: 'text-lg text-gray-600' },
                            children: ['Check out some of the additional tools we provide to boost your productivity:']
                        }),
                        createElement('ul', {
                            attrs: { class: 'mt-4 space-y-2' },
                            children: [
                                'Real-time state management',
                                'Event-driven architecture',
                                'Modular component system'
                            ].map(feature =>
                                createElement('li', {
                                    attrs: { class: 'flex items-center text-gray-700' },
                                    children: [
                                        createElement('svg', {
                                            attrs: {
                                                xmlns: 'http://www.w3.org/2000/svg',
                                                width: '20',
                                                height: '20',
                                                viewBox: '0 0 24 24',
                                                fill: 'none',
                                                stroke: 'currentColor',
                                                'stroke-width': '2',
                                                'stroke-linecap': 'round',
                                                'stroke-linejoin': 'round',
                                                class: 'w-5 h-5 mr-2 text-indigo-600'
                                            },
                                            children: [
                                                createElement('path', {
                                                    attrs: { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' }
                                                })
                                            ]
                                        }),
                                        feature
                                    ]
                                })
                            )
                        })
                    ]
                })
            ]
        })
    ]
});

// Add event listeners if needed
addShockListener('click', (event) => {
    console.log('Get Started button clicked!', event);
    window.location.pathname = '/test';
}, "#getStarted");

addShockListener('click', (event) => {
    console.log('Learn More button clicked!', event);
    window.location.href = 'https://github.com/xlvk/ShockJs';
}, "#learnMore");

addShockListener('click', (event) => {
    console.log('todo button clicked!', event);
    window.location.pathname = '/todoList';
}, "#todoList");

export default vHome;