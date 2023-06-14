import { OneArgumentFunction } from "./OneArgumentFunction";


class Ceil extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.ceil(this.argument.evaluate());
    }


    public override copy(): Ceil {
        return new Ceil(this.argument.copy());
    }
}


export { Ceil };

