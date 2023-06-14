import { Node } from "@/nodes";


abstract class Template extends Node {
    public readonly identifier?: string;


    public constructor(identifier?: string) {
        super();
        if (identifier !== undefined) {
            this.identifier = identifier;
        }
    }


    public abstract define(): Node;


    public abstract override copy(): Template;


    public override evaluate(): number {
        return NaN;
    }
}


export { Template };

