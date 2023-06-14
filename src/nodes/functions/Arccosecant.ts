import { OneArgumentFunction } from "./OneArgumentFunction";


class Arccosecant extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.asin(1 / this.argument.evaluate());
    }


    public override copy(): Arccosecant {
        return new Arccosecant(this.argument.copy());
    }
}


export { Arccosecant };

