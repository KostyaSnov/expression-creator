import { visit } from "../shared/visit";
import { ProxyChild } from "./ProxyChild";


abstract class Node {
    public abstract readonly childs: Iterable<Node>;
    public abstract readonly proxyChilds: Iterable<ProxyChild>;


    public abstract evaluate(): number;

    public abstract copy(): Node;


    public preOrderVisit(callback: (node: Node) => boolean | void): boolean;

    public preOrderVisit(): Generator<Node, void, undefined>;

    public preOrderVisit(callback?: (node: Node) => boolean | void): Generator<Node, void, undefined> | boolean {
        return visit(this.preOrderYieldVisit(), callback);
    }


    public preOrderProxyVisit(callback: (proxyChild: ProxyChild) => boolean | void): boolean;

    public preOrderProxyVisit(): Generator<ProxyChild, void, undefined>;

    public preOrderProxyVisit(callback?: (proxyChild: ProxyChild) => boolean | void): Generator<ProxyChild, void, undefined> | boolean {
        return visit(this.preOrderProxyYieldVisit(), callback);
    }


    public postOrderVisit(callback: (node: Node) => boolean | void): boolean;

    public postOrderVisit(): Generator<Node, void, undefined>;

    public postOrderVisit(callback?: (node: Node) => boolean | void): Generator<Node, void, undefined> | boolean {
        return visit(this.postOrderYieldVisit(), callback);
    }


    public postOrderProxyVisit(callback: (proxyChild: ProxyChild) => boolean | void): boolean;

    public postOrderProxyVisit(): Generator<ProxyChild, void, undefined>;

    public postOrderProxyVisit(callback?: (proxyChild: ProxyChild) => boolean | void): Generator<ProxyChild, void, undefined> | boolean {
        return visit(this.postOrderProxyYieldVisit(), callback);
    }


    public levelOrderVisit(callback: (node: Node) => boolean | void): boolean;

    public levelOrderVisit(): Generator<Node, void, undefined>;

    public levelOrderVisit(callback?: (node: Node) => boolean | void): Generator<Node, void, undefined> | boolean {
        return visit(this.levelOrderYieldVisit(), callback);
    }


    public levelOrderProxyVisit(callback: (proxyChild: ProxyChild) => boolean | void): boolean;

    public levelOrderProxyVisit(): Generator<ProxyChild, void, undefined>;

    public levelOrderProxyVisit(callback?: (proxyChild: ProxyChild) => boolean | void): Generator<ProxyChild, void, undefined> | boolean {
        return visit(this.levelOrderProxyYieldVisit(), callback);
    }


    private *preOrderYieldVisit(): Generator<Node, void, undefined> {
        yield this;
        for (const child of this.childs) {
            yield* child.preOrderYieldVisit();
        }
    }

    private *preOrderProxyYieldVisit(): Generator<ProxyChild, void, undefined> {
        for (const proxyChild of this.proxyChilds) {
            yield proxyChild;
            yield* proxyChild.node.preOrderProxyYieldVisit();
        }
    }


    private *postOrderYieldVisit(): Generator<Node, void, undefined> {
        for (const child of this.childs) {
            yield* child.postOrderYieldVisit();
        }
        yield this;
    }

    private *postOrderProxyYieldVisit(): Generator<ProxyChild, void, undefined> {
        for (const proxyChild of this.proxyChilds) {
            yield* proxyChild.node.postOrderProxyYieldVisit();
            yield proxyChild;
        }
    }


    private *levelOrderYieldVisit(): Generator<Node, void, undefined> {
        const queue: Node[] = [...this.childs];
        let node = queue.shift();
        while (node !== undefined) {
            yield node;
            queue.push(...node.childs);
            node = queue.shift();
        }
    }

    private *levelOrderProxyYieldVisit(): Generator<ProxyChild, void, undefined> {
        const queue = [...this.proxyChilds];
        let proxyChild = queue.shift();
        while (proxyChild !== undefined) {
            yield proxyChild;
            queue.push(...proxyChild.node.proxyChilds);
            proxyChild = queue.shift();
        }
    }
}


export { Node };

