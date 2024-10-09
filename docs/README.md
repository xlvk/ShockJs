# ShockJs
ShockJs is the brand new open-source JavaScript framework built for ease of development and easy framework configuration and customization.

## Features
1. DOM Abstraction <br>
This framework abstracts the Document Object Model (DOM) by, implementing its our Virtual DOM implementation aimed at improving developer experience, performance and code maintainability.
2. State Management <br>
ShockJs also implements its own state management methodology, which effectively handles and tracks the state (or "data") that drives the behaviour and appearance of your web application. This is done by our exclusive shockEventManager class, which stores all the data.
3. Event Handling <br>
A customizable event handling patterns
4. Routing System <br>
Our router system enables your application to have a flexible routing configuration, support for single and multi-page applications & dynamic route handling.

## Usage
To start off, this is the file structure you would need, at least the main directories:
```
├── app/
├── package.json
├── package-lock.json
├── public/
├── src/
├── tsconfig.json
└── webpack.config.js
```
To summarize, all your website code would go into the `app/` directory, whereas `public/` would store all your static data (HTML, CSS, images, etc.), atlast, in `src/` you would find all the ShockJs framework files and code. Because of ShockJs's nature, these files are easily accessible and you can edit the code to customize the framework however you'd like.

import VAppManager from "../src/core/vdom";
Next, we explore the usage of some key elements to using the framework. In the `app/` directory, you may create a typescript file, and start with importing our own vDOM manager, `VAppManager`.

1. Creating elements:
```ts
import VAppManager from "../src/core/vdom";
import createElement from "../src/core/createlement";

// using Shock's element creator, mimicing the JSX way of things. 
let homepage = createElement('div', {
                 attrs: { id: 'App' },
                children: [
                    createElement('Hello World!'); // placing element inside children for nested elements
                ]
            });

vAppManager.setVApp(homepage);
```

2. Creating an event:
```typescript
import addShockListener from "../src/core/event";

// ...some code

addShockListener('click', () => {
    counter = counter + 1;
}, '#someid-or-any-queryselector');

```

3. Adding attributes to element:
```ts
let elem = document.getElementById("app");
element.setAttribute('href', 'https://example.com');
```

## Why things are the way they are
Starting off with ShockJs' file structure, We believe that it offers the right balance of abstraction and ease of navigation. You may say its a perfect mix of coupling & cohesion for front-end typescript applications.

### Virtual DOM
Virtual DOM is built the way it is built to kind of mimick the usage of JSX, without actually using JSX. Keeping your code base consistent with the usage of TypeScript throughout the whole project.

### Routing Methodology
The routing method because we want the user to be able to customize the files and the names they want  where they can specify that they want everything in one html page or in multiple html pages.

### Event listener
ShockJs' event listener for the state management where the user should define any item they want and add the state to change it so the user can decide his own choice. and it's real time as well dw.

### Event handling
we chose our event handling because we want to use our event manger as a customization tool in our framework where anyone can create their own, so we created it as the default framework but they can create their own as well.
