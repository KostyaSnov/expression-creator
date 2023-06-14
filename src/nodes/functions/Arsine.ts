import { OneArgumentFunction } from "./OneArgumentFunction";


class Arsine extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.asinh(this.argument.evaluate());
    }


    public override copy(): Arsine {
        return new Arsine(this.argument.copy());
    }
}


export { Arsine };

