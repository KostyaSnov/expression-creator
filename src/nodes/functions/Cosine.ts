import { OneArgumentFunction } from "./OneArgumentFunction";


class Cosine extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.cos(this.argument.evaluate());
    }


    public override copy(): Cosine {
        return new Cosine(this.argument.copy());
    }
}


export { Cosine };

