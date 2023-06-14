import { ValueGenerator } from "@/generators";
import { Node, ProxyChild, UnaryOperator } from "@/nodes";
import { Template } from "./Template";


class UnaryOperatorTemplate extends Template {
    public constructor(
        public operand: Node,
        public readonly generator: ValueGenerator<(operand: Node) => UnaryOperator>,
        identifier?: string
    ) {
        super(identifier);
    }


    public override get childs(): [operand: Node] {
        return [this.operand];
    }

    public override get proxyChilds(): [operandProxy: ProxyChild] {
        return [new ProxyChild(
            () => this.operand,
            n => this.operand = n
        )];
    }


    public override define(): UnaryOperator {
        return this.generator.generate()(this.operand);
    }


    public override copy(): UnaryOperatorTemplate {
        return new UnaryOperatorTemplate(this.operand.copy(), this.generator);
    }
}


export { UnaryOperatorTemplate };

