import { ShockNode } from './shock_dom';

// scode is a misspllening of snode (aka Shock node).

function render(scode: ShockNode | string): Node {
  if (typeof scode === 'string') {
    return document.createTextNode(scode);
  }

  const el = document.createElement(scode.tag);

  for (const [key, value] of Object.entries(scode.props || {})) {
    el.setAttribute(key, value);
  }

  scode.children.forEach(child => {
    el.appendChild(render(child));
  });

  return el;
}

export { render };