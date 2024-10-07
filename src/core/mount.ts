const mount = ($target: HTMLElement, $node: Element) => {
    $target.replaceWith($node);
    return $node;  
}

export default mount;