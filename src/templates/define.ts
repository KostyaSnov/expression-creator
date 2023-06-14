import { RootNode } from "@/nodes";
import { Template } from "./Template";


const define = (root: RootNode): void => {
    for (const proxyChild of root.postOrderProxyVisit()) {
        if (proxyChild.node instanceof Template) {
            proxyChild.node = proxyChild.node.define();
        }
    }
}


export { define };

