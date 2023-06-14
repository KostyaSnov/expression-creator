import { OneArgumentFunction } from "./OneArgumentFunction";


class Arcotangent extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.atanh(1 / this.argument.evaluate());
    }


    public override copy(): Arcotangent {
        return new Arcotangent(this.argument.copy());
    }
}


export { Arcotangent };

