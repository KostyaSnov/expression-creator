import { Node } from "../node/Node";
import { BinaryOperator } from "./BinaryOperator";


class Division extends BinaryOperator {
    public constructor(dividend: Node, divisor: Node) {
        super(dividend, divisor);
    }


    public get dividend(): Node {
        return this.firstOperand;
    }

    public set dividend(node: Node) {
        this.firstOperand = node;
    }

    public get divisor(): Node {
        return this.secondOperand;
    }

    public set divisor(node: Node) {
        this.secondOperand = node;
    }


    public override evaluate(): number {
        return this.dividend.evaluate() / this.divisor.evaluate();
    }


    public override copy(): Division {
        return new Division(this.dividend.copy(), this.divisor.copy());
    }
}


export { Division };

