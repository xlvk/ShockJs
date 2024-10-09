// The mount function is used to replace a target HTML element with a new node in the DOM
const mount = ($target: HTMLElement, $node: Element) => {
    // Replace the $target element with the $node element in the DOM
    $target.replaceWith($node);
    return $node;
}

// Export the mount function as the default export
export default mount;