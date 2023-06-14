import { OneArgumentFunction } from "./OneArgumentFunction";


class Arcsine extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.asin(this.argument.evaluate());
    }


    public override copy(): Arcsine {
        return new Arcsine(this.argument.copy());
    }
}


export { Arcsine };

