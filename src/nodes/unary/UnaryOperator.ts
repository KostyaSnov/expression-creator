import { Function } from "../functions/Function";
import { Node } from "../node/Node";


abstract class UnaryOperator extends Function {
    protected constructor(operand: Node) {
        super([operand]);
    }


    public get operand(): Node {
        return this.parameters[0];
    }

    public set operand(node: Node) {
        this.parameters[0] = node;
    }


    public abstract override copy(): UnaryOperator;
}


export { UnaryOperator };

