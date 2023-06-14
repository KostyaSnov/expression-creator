import { validateIdentifier } from "../shared/validateIdentifier";
import { Primary } from "./Primary";


class Variable extends Primary {
    public constructor(public readonly name: string) {
        validateIdentifier(name);
        super();
    }


    public override evaluate(): number {
        return NaN;
    }
}


export { Variable };

