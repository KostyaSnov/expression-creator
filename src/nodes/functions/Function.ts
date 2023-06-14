import { Node } from "../node/Node";
import { ProxyChild } from "../node/ProxyChild";


abstract class Function extends Node {
    public constructor(public readonly parameters: Node[]) {
        super();
    }


    public override get childs(): Node[] {
        return this.parameters;
    }

    public override get proxyChilds(): Generator<ProxyChild, void, undefined> {
        return this.getProxyChilds();
    }


    public abstract override copy(): Function;


    private *getProxyChilds(): Generator<ProxyChild, void, undefined> {
        const parameters = this.parameters;
        for (let i = 0; i < parameters.length; ++i) {
            yield new ProxyChild(
                () => parameters[i],
                n => parameters[i] = n
            );
        }
    }
}


export { Function };

