import { ValueGenerator } from "@/generators";
import { BinaryOperator, Node, ProxyChild } from "@/nodes";
import { Template } from "./Template";


class BinaryOperatorTemplate extends Template {
    public constructor(
        public firstOperand: Node,
        public secondOperand: Node,
        public readonly generator: ValueGenerator<(firstOperand: Node, secondOperand: Node) => BinaryOperator>,
        identifier?: string
    ) {
        super(identifier);
    }


    public override get childs(): [firstOperand: Node, secondOperand: Node] {
        return [this.firstOperand, this.secondOperand];
    }

    public override get proxyChilds(): [firstOperandProxy: ProxyChild, secondOperandProxy: ProxyChild] {
        return [
            new ProxyChild(
                () => this.firstOperand,
                n => this.firstOperand = n
            ),
            new ProxyChild(
                () => this.secondOperand,
                n => this.secondOperand = n
            )
        ];
    }


    public override define(): BinaryOperator {
        return this.generator.generate()(this.firstOperand, this.secondOperand);
    }


    public override copy(): BinaryOperatorTemplate {
        return new BinaryOperatorTemplate(this.firstOperand.copy(), this.secondOperand.copy(), this.generator);
    }
}


export { BinaryOperatorTemplate };

