import { visit } from "../shared/visit";
import { Node } from "./Node";
import { ProxyChild } from "./ProxyChild";


class RootNode {
    private readonly proxyChild: ProxyChild;


    public constructor(node: Node) {
        this.proxyChild = new ProxyChild(
            () => node,
            n => node = n
        );
    }


    public get node(): Node {
        return this.proxyChild.node;
    }


    public preOrderProxyVisit(callback: (child: ProxyChild) => boolean | void): boolean;

    public preOrderProxyVisit(): Generator<ProxyChild, void, undefined>;

    public preOrderProxyVisit(callback?: (child: ProxyChild) => boolean | void): Generator<ProxyChild, void, undefined> | boolean {
        return visit(this.preOrderProxyYieldVisit(), callback);
    }


    public postOrderProxyVisit(callback: (child: ProxyChild) => boolean | void): boolean;

    public postOrderProxyVisit(): Generator<ProxyChild, void, undefined>;

    public postOrderProxyVisit(callback?: (child: ProxyChild) => boolean | void): Generator<ProxyChild, void, undefined> | boolean {
        return visit(this.postOrderProxyYieldVisit(), callback);
    }


    public levelOrderProxyVisit(callback: (child: ProxyChild) => boolean | void): boolean;

    public levelOrderProxyVisit(): Generator<ProxyChild, void, undefined>;

    public levelOrderProxyVisit(callback?: (child: ProxyChild) => boolean | void): Generator<ProxyChild, void, undefined> | boolean {
        return visit(this.levelOrderProxyYieldVisit(), callback);
    }


    private *preOrderProxyYieldVisit(): Generator<ProxyChild, void, undefined> {
        yield this.proxyChild;
        yield* this.proxyChild.node.preOrderProxyVisit();
    }

    private *postOrderProxyYieldVisit(): Generator<ProxyChild, void, undefined> {
        yield* this.proxyChild.node.postOrderProxyVisit();
        yield this.proxyChild;
    }

    private *levelOrderProxyYieldVisit(): Generator<ProxyChild, void, undefined> {
        yield this.proxyChild;
        yield* this.proxyChild.node.levelOrderProxyVisit();
    }
}


export { RootNode };

