interface ValueGenerator<T> {
    generate(): T;
    generate(number: number): Iterable<T>;
    generate(number: number, callback: (value: T) => boolean): boolean;
}


export { ValueGenerator };

