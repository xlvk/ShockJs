const createElement = (tagName: string, { attrs = {}, children = [] }: { attrs?: object, children?: Array<string> } = {}) => {
    return {
        tagName,
        attrs: attrs || {},
        children: children || []
    };
};

export default createElement;