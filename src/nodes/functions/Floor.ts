import { OneArgumentFunction } from "./OneArgumentFunction";


class Floor extends OneArgumentFunction {
    public override evaluate(): number {
        return Math.floor(this.argument.evaluate());
    }


    public override copy(): Floor {
        return new Floor(this.argument.copy());
    }
}


export { Floor };

