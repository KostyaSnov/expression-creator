import { ValueGeneratorBase } from "./ValueGeneratorBase";


class SingleGenerator<T> extends ValueGeneratorBase<T> {
    public constructor(private readonly value: T) {
        super();
    }


    protected override generateOne(): T {
        return this.value;
    }
}


export { SingleGenerator };

