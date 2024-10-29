const createElement = (tagName: string, { attrs = {}, children = [] }: { attrs?: Record<string, string>; events?: Record<string, (event: Event) => void>; children?: (string | HTMLElement)[] }): HTMLElement => {
    // Create a new HTML element of the specified tagName
    const element = document.createElement(tagName);

    // Iterate over the entries in the attrs object and set each attribute on the created element
    for (const [key, value] of Object.entries(attrs)) {
        element.setAttribute(key, value as string);
    }

    // Iterate over the children array and append each child to the created element
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (typeof child === 'string') {
            // If the child is a string, create a text node and append it
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
            // If the child is an Element object, append it directly
            element.appendChild(child);
        }
    }

    return element;
};


export function loadCSS(href: string) {
    const linkElement = createElement('link', {
        attrs: {
            rel: 'stylesheet',
            type: 'text/css',
            href: href
        }
    });
    document.head.appendChild(linkElement);
}


// Export createElement as the default export
export default createElement;