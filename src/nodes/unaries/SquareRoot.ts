import { Node } from "../node/Node";
import { UnaryOperator } from "./UnaryOperator";


class SquareRoot extends UnaryOperator {
    public constructor(radicand: Node) {
        super(radicand);
    }


    public get radicand(): Node {
        return this.operand;
    }

    public set radicand(node: Node) {
        this.operand = node;
    }


    public override evaluate(): number {
        return this.radicand.evaluate() ** 0.5;
    }


    public override copy(): SquareRoot {
        return new SquareRoot(this.radicand.copy());
    }
}


export { SquareRoot };

