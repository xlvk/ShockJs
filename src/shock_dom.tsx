import React from 'react';

interface ShockNodeProps {
  [key: string]: any;
}

class ShockNode {
  tag: string;
  props: ShockNodeProps;
  children: (ShockNode | string)[];
  
  constructor(tag: string, props: ShockNodeProps, children: (ShockNode | string)[]) {
    this.tag = tag;
    this.props = props;
    this.children = children;
  }
}
  
function s(tag: string, props: ShockNodeProps, ...children: (ShockNode | string)[]): ShockNode {
  return new ShockNode(tag, props, children);
}
  
export { ShockNode, s };