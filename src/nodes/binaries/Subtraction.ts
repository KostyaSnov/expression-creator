import { Node } from "../node/Node";
import { BinaryOperator } from "./BinaryOperator";


class Subtraction extends BinaryOperator {
    public constructor(minuend: Node, subtrahend: Node) {
        super(minuend, subtrahend);
    }


    public get minuend(): Node {
        return this.firstOperand;
    }

    public set minuend(node: Node) {
        this.firstOperand = node;
    }

    public get subtrahend(): Node {
        return this.secondOperand;
    }

    public set subtrahend(node: Node) {
        this.secondOperand = node;
    }


    public override evaluate(): number {
        return this.minuend.evaluate() - this.subtrahend.evaluate();
    }


    public override copy(): Subtraction {
        return new Subtraction(this.minuend.copy(), this.subtrahend.copy());
    }
}


export { Subtraction };

