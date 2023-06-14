import { ValueGenerator } from "@/generators";
import { NamedConstant } from "@/nodes";
import { PrimaryTemplate } from "./PrimaryTemplate";


class NamedConstantTemplate extends PrimaryTemplate {
    public constructor(
        public readonly generator: ValueGenerator<NamedConstant>,
        identifier?: string
    ) {
        super(identifier);
    }


    public override define(): NamedConstant {
        return this.generator.generate();
    }
}


export { NamedConstantTemplate };

