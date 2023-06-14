import { ValueGenerator } from "@/generators";
import { Variable } from "@/nodes";
import { PrimaryTemplate } from "./PrimaryTemplate";


class VariableTemplate extends PrimaryTemplate {
    public constructor(
        public readonly generator: ValueGenerator<Variable>,
        identifier?: string
    ) {
        super(identifier);
    }


    public override define(): Variable {
        return this.generator.generate();
    }
}


export { VariableTemplate };

