import { Node } from "../node/Node";
import { UnaryOperator } from "./UnaryOperator";


class Plus extends UnaryOperator {
    public constructor(operand: Node) {
        super(operand);
    }


    public override evaluate(): number {
        return this.operand.evaluate();
    }


    public override copy(): Plus {
        return new Plus(this.operand);
    }
}


export { Plus };

