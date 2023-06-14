import { ValueGenerator } from "@/generators";
import { Constant } from "@/nodes";
import { PrimaryTemplate } from "./PrimaryTemplate";


class ConstantTemplate extends PrimaryTemplate {
    public constructor(
        public readonly generator: ValueGenerator<Constant>,
        identifier?: string
    ) {
        super(identifier);
    }


    public override define(): Constant {
        return this.generator.generate();
    }
}


export { ConstantTemplate };

