import { OneArgumentFunction } from "./OneArgumentFunction";


class Arccotangent extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.PI / 2 - Math.atan(this.argument.evaluate());
    }


    public override copy(): Arccotangent {
        return new Arccotangent(this.argument.copy());
    }
}


export { Arccotangent };

