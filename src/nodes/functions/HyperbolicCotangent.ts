import { OneArgumentFunction } from "./OneArgumentFunction";


class HyperbolicCotangent extends OneArgumentFunction {
    public override evaluate(): number {
        return 1 / Math.tanh(this.argument.evaluate());
    }


    public override copy(): HyperbolicCotangent {
        return new HyperbolicCotangent(this.argument.copy());
    }
}


export { HyperbolicCotangent };

