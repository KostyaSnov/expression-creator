import { OneArgumentFunction } from "./OneArgumentFunction";


class NaturalLogarithm extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.log(this.argument.evaluate());
    }


    public override copy(): NaturalLogarithm {
        return new NaturalLogarithm(this.argument.copy());
    }
}


export { NaturalLogarithm };

