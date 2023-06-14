import { OneArgumentFunction } from "./OneArgumentFunction";


class Arcsecant extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.acos(1 / this.argument.evaluate());
    }


    public override copy(): Arcsecant {
        return new Arcsecant(this.argument.copy());
    }
}


export { Arcsecant };

