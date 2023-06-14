import { OneArgumentFunction } from "./OneArgumentFunction";


class CommonLogarithm extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.log10(this.argument.evaluate());
    }


    public override copy(): CommonLogarithm {
        return new CommonLogarithm(this.argument.copy());
    }
}


export { CommonLogarithm };

