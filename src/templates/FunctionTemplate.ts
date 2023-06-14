import { ValueGenerator } from "@/generators";
import { Function, Node, ProxyChild } from "@/nodes";
import { Template } from "./Template";


class FunctionTemplate extends Template {
    public constructor(
        public readonly parameters: Node[],
        public readonly generator: ValueGenerator<(parameters: Node[]) => Function>,
        identifier?: string
    ) {
        super(identifier);
    }


    public override get childs(): Node[] {
        return this.parameters;
    }

    public override get proxyChilds(): Generator<ProxyChild, void, undefined> {
        return this.getProxyChilds();
    }


    public override define(): Function {
        return this.generator.generate()(this.parameters);
    }


    public override copy(): FunctionTemplate {
        return new FunctionTemplate(this.parameters.map(p => p.copy()), this.generator);
    }


    private *getProxyChilds(): Generator<ProxyChild, void, undefined> {
        const parameters = this.parameters;
        for (let i = 0; i < parameters.length; ++i) {
            yield new ProxyChild(
                () => parameters[i],
                n => parameters[i] = n
            );
        }
    }
}


export { FunctionTemplate };

