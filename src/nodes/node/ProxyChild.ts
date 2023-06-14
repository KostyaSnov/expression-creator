import { Node } from "./Node";


class ProxyChild {
    public node!: Node;


    public constructor(get: () => Node, set: (node: Node) => void) {
        Object.defineProperty(this, "node", {
            get,
            set,
            enumerable: true
        });
    }
}


export { ProxyChild };

