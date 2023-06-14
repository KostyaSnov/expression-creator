import { Node, Primary, ProxyChild } from "@/nodes";
import { Template } from "./Template";


abstract class PrimaryTemplate extends Template {
    public override copy(): this {
        return this;
    }


    public override get childs(): Node[] {
        return [];
    }

    public override get proxyChilds(): ProxyChild[] {
        return [];
    }


    public abstract override define(): Primary;
}


export { PrimaryTemplate };

