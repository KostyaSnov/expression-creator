import { Node } from "../node/Node";
import { Function } from "./Function";


abstract class OneArgumentFunction extends Function {
    public constructor(argument: Node) {
        super([argument]);
    }


    public get argument(): Node {
        return this.parameters[0];
    }

    public set argument(node: Node) {
        this.parameters[0] = node;
    }
}


export { OneArgumentFunction };

