import { Node } from "../node/Node";
import { BinaryOperator } from "./BinaryOperator";


class Root extends BinaryOperator {
    public constructor(degree: Node, radicand: Node) {
        super(degree, radicand);
    }


    public get degree(): Node {
        return this.firstOperand;
    }

    public set degree(node: Node) {
        this.firstOperand = node;
    }

    public get radicand(): Node {
        return this.secondOperand;
    }

    public set radicand(node: Node) {
        this.secondOperand = node;
    }


    public override evaluate(): number {
        return this.degree.evaluate() ** (1 / this.radicand.evaluate());
    }


    public override copy(): Root {
        return new Root(this.degree.copy(), this.radicand.copy());
    }
}


export { Root };

