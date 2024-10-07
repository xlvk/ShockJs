const mount = ($target: HTMLElement, $node: Node) => {
    $target.replaceWith($node);
    return $node;  
}

export default mount;