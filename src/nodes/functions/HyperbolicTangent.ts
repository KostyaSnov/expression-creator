import { OneArgumentFunction } from "./OneArgumentFunction";


class HyperbolicTangent extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.tanh(this.argument.evaluate());
    }


    public override copy(): HyperbolicTangent {
        return new HyperbolicTangent(this.argument.copy());
    }
}


export { HyperbolicTangent };

