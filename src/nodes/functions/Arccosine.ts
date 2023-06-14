import { OneArgumentFunction } from "./OneArgumentFunction";


class Arccosine extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.acos(this.argument.evaluate());
    }


    public override copy(): Arccosine {
        return new Arccosine(this.argument.copy());
    }
}


export { Arccosine };

