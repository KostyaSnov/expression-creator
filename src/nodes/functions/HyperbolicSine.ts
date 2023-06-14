import { OneArgumentFunction } from "./OneArgumentFunction";


class HyperbolicSine extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.sinh(this.argument.evaluate());
    }


    public override copy(): HyperbolicSine {
        return new HyperbolicSine(this.argument.copy());
    }
}


export { HyperbolicSine };

