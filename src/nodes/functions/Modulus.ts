import { OneArgumentFunction } from "./OneArgumentFunction";


class Modulus extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.abs(this.argument.evaluate());
    }


    public override copy(): Modulus {
        return new Modulus(this.argument.copy());
    }
}


export { Modulus };

