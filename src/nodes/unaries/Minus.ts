import { Node } from "../node/Node";
import { UnaryOperator } from "./UnaryOperator";


class Minus extends UnaryOperator {
    public constructor(operand: Node) {
        super(operand);
    }


    public override evaluate(): number {
        return -this.operand.evaluate();
    }


    public override copy(): Minus {
        return new Minus(this.operand.copy());
    }
}


export { Minus };

