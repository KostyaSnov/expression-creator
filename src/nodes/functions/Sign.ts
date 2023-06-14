import { OneArgumentFunction } from "./OneArgumentFunction";


class Sign extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.sign(this.argument.evaluate());
    }


    public override copy(): Sign {
        return new Sign(this.argument.copy());
    }
}


export { Sign };

