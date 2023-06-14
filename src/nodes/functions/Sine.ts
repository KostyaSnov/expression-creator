import { OneArgumentFunction } from "./OneArgumentFunction";


class Sine extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.sin(this.argument.evaluate());
    }


    public override copy(): Sine {
        return new Sine(this.argument.copy());
    }
}


export { Sine };

