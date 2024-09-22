const createElement = (tagName: string, { attrs = {}, children = [] }: { attrs?: object, children?: Array<string> } = {}) : Node => {
    const element = document.createElement(tagName);

    for (const [key, value] of Object.entries(attrs)) {
        element.setAttribute(key, value as string);
    }

    children.forEach(child => {
        const childNode = document.createTextNode(child);
        element.appendChild(childNode);
    });

    return element;
};


export default createElement;