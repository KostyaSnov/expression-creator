import { OneArgumentFunction } from "./OneArgumentFunction";


class Arsecant extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.acosh(1 / this.argument.evaluate());
    }


    public override copy(): Arsecant {
        return new Arsecant(this.argument.copy());
    }
}


export { Arsecant };

