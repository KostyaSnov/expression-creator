import { validateIdentifier } from "../shared/validateIdentifier";
import { Constant } from "./Constant";


class NamedConstant extends Constant {
    public constructor(
        public readonly name: string,
        value: number
    ) {
        super(value);
        validateIdentifier(name);
    }
}


const PI = new NamedConstant("π", Math.PI);
const E = new NamedConstant("e", Math.E);


export { PI, NamedConstant, E };

