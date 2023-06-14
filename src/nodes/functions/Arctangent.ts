import { OneArgumentFunction } from "./OneArgumentFunction";


class Arctangent extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.atan(this.argument.evaluate());
    }


    public override copy(): Arctangent {
        return new Arctangent(this.argument.copy());
    }
}


export { Arctangent };

