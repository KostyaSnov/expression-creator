import { ValueGenerator } from "./ValueGenerator";
import { ValueGeneratorBase } from "./ValueGeneratorBase";


class GeneratorWrapper<TIn, TOut> extends ValueGeneratorBase<TOut> {
    public constructor(
        private readonly generator: ValueGenerator<TIn>,
        private readonly convert: (value: TIn) => TOut
    ) {
        super();
    }


    protected override generateOne(): TOut {
        return this.convert(this.generator.generate());
    }
}


export { GeneratorWrapper };

