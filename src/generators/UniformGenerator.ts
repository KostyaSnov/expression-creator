import { ValueGeneratorBase } from "./ValueGeneratorBase";


class UniformGenerator<T> extends ValueGeneratorBase<T> {
    public constructor(private readonly values: readonly T[]) {
        super();
    }


    protected override generateOne(): T {
        return this.values[Math.floor(this.values.length * Math.random())];
    }
}


export { UniformGenerator };

