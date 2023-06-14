import { Node } from "../node/Node";
import { Function } from "./Function";


class Logarithm extends Function {
    public constructor(base: Node, argument: Node) {
        super([base, argument]);
    }


    public get base(): Node {
        return this.parameters[0];
    }

    public set base(node: Node) {
        this.parameters[0] = node;
    }

    public get argument(): Node {
        return this.parameters[1];
    }

    public set argument(node: Node) {
        this.parameters[1] = node;
    }


    public override evaluate(): number {
        return Math.log(this.argument.evaluate()) / Math.log(this.base.evaluate());
    }


    public override copy(): Logarithm {
        return new Logarithm(this.base.copy(), this.argument.copy());
    }
}


export { Logarithm };

