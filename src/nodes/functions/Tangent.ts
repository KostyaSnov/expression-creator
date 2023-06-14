import { OneArgumentFunction } from "./OneArgumentFunction";


class Tangent extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.tan(this.argument.evaluate());
    }


    public override copy(): Tangent {
        return new Tangent(this.argument.copy());
    }
}


export { Tangent };

