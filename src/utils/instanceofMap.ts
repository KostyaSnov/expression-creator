class InstanceofMap<V> {
    public constructor(private readonly values: WeakMap<Function, V>) { }


    public getByConstructor(constructor: Function): V | undefined {
        const values = this.values;

        const result = values.get(constructor);
        if (result !== undefined) {
            return result;
        }

        let baseConstructor = Object.getPrototypeOf(constructor);
        while (baseConstructor !== null) {
            const result = values.get(baseConstructor);
            if (result !== undefined) {
                values.set(constructor, result);
                return result;
            }
            baseConstructor = Object.getPrototypeOf(baseConstructor);
        }
        return undefined;
    }


    public get(instance: { constructor: Function }): V | undefined {
        return this.getByConstructor(instance.constructor);
    }
}


export { InstanceofMap };

