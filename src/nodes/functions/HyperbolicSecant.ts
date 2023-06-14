import { OneArgumentFunction } from "./OneArgumentFunction";


class HyperbolicSecant extends OneArgumentFunction {
    public override evaluate(): number {
        return 1 / Math.cosh(this.argument.evaluate());
    }


    public override copy(): HyperbolicSecant {
        return new HyperbolicSecant(this.argument.copy());
    }
}


export { HyperbolicSecant };

