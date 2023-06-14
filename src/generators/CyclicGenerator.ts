import { ArgumentError } from "@/utils/errors";
import { ValueGeneratorBase } from "./ValueGeneratorBase";


class CyclicGenerator<T> extends ValueGeneratorBase<T>{
    public constructor(private readonly values: T[]) {
        super();
        if (this.values.length === 0) {
            throw new ArgumentError("Values must contain at least one element.", "values");
        }
    }


    public shuffle(): void {
        const values = this.values;
        for (let i = values.length - 1; i > 0; --i) {
            const newI = Math.floor(Math.random() * (i + 1));
            [values[i], values[newI]] = [values[newI], values[i]];
        }
    }


    protected override generateOne(): T {
        const result = this.values.shift()!;
        this.values.push(result);
        return result;
    }
}


export { CyclicGenerator };

