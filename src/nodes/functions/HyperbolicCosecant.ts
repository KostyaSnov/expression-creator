import { OneArgumentFunction } from "./OneArgumentFunction";


class HyperbolicCosecant extends OneArgumentFunction {
    public override evaluate(): number {
        return 1 / Math.sinh(this.argument.evaluate());
    }


    public override copy(): HyperbolicCosecant {
        return new HyperbolicCosecant(this.argument.copy());
    }
}


export { HyperbolicCosecant };

