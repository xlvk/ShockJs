# ShockJs

A lightweight, customizable TypeScript framework for building modern web applications with Virtual DOM implementation and flexible state management.

## ✨ Features

- **Virtual DOM**: Custom implementation for improved performance
- **State Management**: Built-in state handling via `shockEventManager`
- **Event System**: Flexible event handling patterns
- **Routing**: Dynamic routing with SPA/MPA support

## 🚀 Quick Start

```bash
# Project structure
├── app/          # Your application code
├── public/       # Static assets
├── src/          # ShockJs framework files
└── config files  # Package.json, webpack.config.js, etc.
```

### Basic Usage

```typescript
import VAppManager from "../src/core/vdom";
import createElement from "../src/core/createlement";

// Create an element
const homepage = createElement('div', {
    attrs: { id: 'App' },
    children: [
        createElement('Hello World!')
    ]
});

// Mount your app
vAppManager.setVApp(homepage);

// Add event listeners
import addShockListener from "../src/core/event";
addShockListener('click', () => {
    counter++;
}, '#button');
```

## 🛠 Why ShockJs?

- **TypeScript First**: Built with TypeScript for better development experience
- **Customizable**: Easy to modify and extend framework components
- **No JSX Required**: JSX-like syntax without the complexity
- **Developer Friendly**: Simple API with powerful features

## Contributors
- [Fatima Abbas](https://github.com/xlvk)
- [Sayed Hesham Al-Mosawi](https://github.com/heshamalmosawi)
- [Fares Alashkar](https://github.com/Exortix)
- [Abdulrahman Idrees](https://github.com/akhaled01)
