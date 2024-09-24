const createElement = (tagName: string, { attrs = {}, children = [] }: { attrs?: object, children?: Array<Node | string>} = {}) : Node => {
    const element = document.createElement(tagName);

    for (const [key, value] of Object.entries(attrs)) {
        element.setAttribute(key, value as string);
    }

    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    }

    return element;
};


export default createElement;