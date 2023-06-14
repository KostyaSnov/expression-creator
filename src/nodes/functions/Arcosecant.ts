import { OneArgumentFunction } from "./OneArgumentFunction";


class Arcosecant extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.sinh(1 / this.argument.evaluate());
    }


    public override copy(): Arcosecant {
        return new Arcosecant(this.argument.copy());
    }
}


export { Arcosecant };

