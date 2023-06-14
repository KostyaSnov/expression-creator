import { OneArgumentFunction } from "./OneArgumentFunction";


class Artangent extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.atanh(this.argument.evaluate());
    }


    public override copy(): Artangent {
        return new Artangent(this.argument.copy());
    }
}


export { Artangent };

