import { ValueGenerator } from "./ValueGenerator";
import { ValueGeneratorBase } from "./ValueGeneratorBase";


class RoundNumberGenerator extends ValueGeneratorBase<number>{
    public constructor(
        private readonly generator: ValueGenerator<number>,
        public readonly precision: number
    ) {
        super();
    }


    protected override generateOne(): number {
        return parseFloat(this.generator.generate().toFixed(this.precision));
    }
}


export { RoundNumberGenerator };

