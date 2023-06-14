import { OneArgumentFunction } from "./OneArgumentFunction";


class Cotangent extends OneArgumentFunction {
    public override evaluate(): number {
        return 1 / Math.tan(this.argument.evaluate());
    }


    public override copy(): Cotangent {
        return new Cotangent(this.argument.copy());
    }
}


export { Cotangent };

