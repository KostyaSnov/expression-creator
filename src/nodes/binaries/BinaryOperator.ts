import { Function } from "../functions/Function";
import { Node } from "../node/Node";


abstract class BinaryOperator extends Function {
    public constructor(firstOperand: Node, secondOperand: Node) {
        super([firstOperand, secondOperand]);
    }


    public get firstOperand(): Node {
        return this.parameters[0];
    }

    public set firstOperand(node: Node) {
        this.parameters[0] = node;
    }

    public get secondOperand(): Node {
        return this.parameters[1];
    }

    public set secondOperand(node: Node) {
        this.parameters[1] = node;
    }


    public abstract override copy(): BinaryOperator;
}


export { BinaryOperator };

