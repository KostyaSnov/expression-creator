import { OneArgumentFunction } from "./OneArgumentFunction";


class FractionalPart extends OneArgumentFunction {
    public override evaluate(): number {
        const argumentValue = this.argument.evaluate();
        return argumentValue - Math.floor(argumentValue);
    }


    public override copy(): FractionalPart {
        return new FractionalPart(this.argument.copy());
    }
}


export { FractionalPart };

