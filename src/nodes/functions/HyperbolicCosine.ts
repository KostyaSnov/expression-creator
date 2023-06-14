import { OneArgumentFunction } from "./OneArgumentFunction";


class HyperbolicCosine extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.cosh(this.argument.evaluate());
    }


    public override copy(): HyperbolicCosine {
        return new HyperbolicCosine(this.argument.copy());
    }
}


export { HyperbolicCosine };

