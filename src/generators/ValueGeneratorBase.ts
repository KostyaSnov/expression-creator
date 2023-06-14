import { ValueGenerator } from "./ValueGenerator";


abstract class ValueGeneratorBase<T> implements ValueGenerator<T>{
    public generate(): T;

    public generate(number: number): Generator<T, void, undefined>;

    public generate(number: number, callback: (value: T, index: number) => boolean | void): boolean;

    public generate(number?: number, callback?: (value: T, index: number) => boolean | void): T | Generator<T, void, undefined> | boolean {
        if (number === undefined) {
            return this.generateOne();
        }
        if (callback === undefined) {
            return this.generateSeveral(number);
        }
        for (let i = 0; i < number; ++i) {
            const value = this.generateOne();
            if (callback(value, i)) {
                return true;
            }
        }
        return false;
    }


    protected abstract generateOne(): T;


    private *generateSeveral(number: number): Generator<T, void, undefined> {
        for (let i = 0; i < number; ++i) {
            yield this.generateOne();
        }
    }
}


export { ValueGeneratorBase };

