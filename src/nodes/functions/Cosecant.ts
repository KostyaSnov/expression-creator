import { OneArgumentFunction } from "./OneArgumentFunction";


class Cosecant extends OneArgumentFunction {
    public override evaluate(): number {
        return 1 / Math.sin(this.argument.evaluate());
    }


    public override copy(): Cosecant {
        return new Cosecant(this.argument.copy());
    }
}


export { Cosecant };

