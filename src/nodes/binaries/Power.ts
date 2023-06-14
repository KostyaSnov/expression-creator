import { Node } from "../node/Node";
import { BinaryOperator } from "./BinaryOperator";


class Power extends BinaryOperator {
    public constructor(base: Node, exponent: Node) {
        super(base, exponent);
    }


    public get base(): Node {
        return this.firstOperand;
    }

    public set base(node: Node) {
        this.firstOperand = node;
    }

    public get exponent(): Node {
        return this.secondOperand;
    }

    public set exponent(node: Node) {
        this.secondOperand = node;
    }


    public override evaluate(): number {
        return this.base.evaluate() ** this.exponent.evaluate();
    }


    public override copy(): Power {
        return new Power(this.base.copy(), this.exponent.copy());
    }
}


export { Power };

