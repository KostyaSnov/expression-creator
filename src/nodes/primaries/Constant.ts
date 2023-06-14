import { Primary } from "./Primary";


class Constant extends Primary {
    public constructor(public readonly value: number) {
        super();
    }


    public override evaluate(): number {
        return this.value;
    }
}


export { Constant };

