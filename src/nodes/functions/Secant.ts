import { OneArgumentFunction } from "./OneArgumentFunction";


class Secant extends OneArgumentFunction {
    public override evaluate(): number {
        return 1 / Math.cos(this.argument.evaluate());
    }


    public override copy(): Secant {
        return new Secant(this.argument.copy());
    }
}


export { Secant };

