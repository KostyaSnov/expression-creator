import { Node } from "../node/Node";
import { ProxyChild } from "../node/ProxyChild";


abstract class Primary extends Node {
    public override copy(): this {
        return this;
    }


    public override get childs(): Node[] {
        return [];
    }

    public override get proxyChilds(): ProxyChild[] {
        return [];
    }
}


export { Primary };

