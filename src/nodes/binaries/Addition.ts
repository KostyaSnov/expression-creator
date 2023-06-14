import { Node } from "../node/Node";
import { BinaryOperator } from "./BinaryOperator";


class Addition extends BinaryOperator {
    public constructor(firstAddend: Node, secondAddend: Node) {
        super(firstAddend, secondAddend);
    }


    public get firstAddend(): Node {
        return this.firstOperand;
    }

    public set firstAddend(node: Node) {
        this.firstOperand = node;
    }

    public get secondAddend(): Node {
        return this.secondOperand;
    }

    public set secondAddend(node: Node) {
        this.secondOperand = node;
    }


    public override evaluate(): number {
        return this.firstAddend.evaluate() + this.secondAddend.evaluate();
    }


    public override copy(): Addition {
        return new Addition(this.firstAddend.copy(), this.secondAddend.copy());
    }
}


export { Addition };

