import { Node } from "../node/Node";
import { BinaryOperator } from "./BinaryOperator";


class Multiplication extends BinaryOperator {
    public constructor(firstFactor: Node, secondFactor: Node) {
        super(firstFactor, secondFactor);
    }


    public get firstFactor(): Node {
        return this.firstOperand;
    }

    public set firstFactor(node: Node) {
        this.firstOperand = node;
    }

    public get secondFactor(): Node {
        return this.secondOperand;
    }

    public set secondFactor(node: Node) {
        this.secondOperand = node;
    }


    public override evaluate(): number {
        return this.firstFactor.evaluate() * this.secondFactor.evaluate();
    }


    public override copy(): Multiplication {
        return new Multiplication(this.firstFactor.copy(), this.secondFactor.copy());
    }
}


export { Multiplication };

