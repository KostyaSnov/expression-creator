import { Node } from "@/nodes";


const throwNotSupported = (node: Node): never => {
    throw new TypeError(`'${node.constructor.name}' type node is not supported.`);
}


export { throwNotSupported };

