import { OneArgumentFunction } from "./OneArgumentFunction";


class Arcosine extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.acosh(this.argument.evaluate());
    }


    public override copy(): Arcosine {
        return new Arcosine(this.argument.copy());
    }
}


export { Arcosine };

