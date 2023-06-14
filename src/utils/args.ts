import { ArgumentError } from "@/utils/errors";


const arrayToArray = <TArgs extends readonly unknown[], TResult>(
    function_: (args: TArgs) => TResult,
    numberArgs?: TArgs["length"]
): (args: TArgs) => TResult => {
    if (numberArgs === undefined) {
        return function_;
    }
    return args => {
        if (numberArgs === args.length) {
            return function_(args);
        }
        throw new ArgumentError(`Expected ${numberArgs} arguments but received ${args.length}.`, "args");
    }
}


const arrayToSpread = <TArgs extends readonly unknown[], TResult>(
    function_: (args: TArgs) => TResult,
    numberArgs?: TArgs["length"]
): (...args: TArgs) => TResult => {
    const creator = arrayToArray(function_, numberArgs);
    return (...args) => creator(args);
}


const spreadToArray = <TArgs extends readonly unknown[], TResult>(
    function_: (...args: TArgs) => TResult,
    numberArgs?: TArgs["length"]
): (args: TArgs) => TResult => arrayToArray(args => function_(...args), numberArgs);


const spreadToSpread = <TArgs extends readonly unknown[], TResult>(
    function_: (...args: TArgs) => TResult,
    numberArgs?: TArgs["length"]
): (...args: TArgs) => TResult => arrayToSpread(args => function_(...args), numberArgs);


const constructorToArray = <TArgs extends readonly unknown[], TResult>(
    Constructor: new (...args: TArgs) => TResult,
    numberArgs?: TArgs["length"]
): (args: TArgs) => TResult => arrayToArray(args => new Constructor(...args), numberArgs);


const constructorToSpread = <TArgs extends readonly unknown[], TResult>(
    Constructor: new (...args: TArgs) => TResult,
    numberArgs?: TArgs["length"]
): (...args: TArgs) => TResult => arrayToSpread(args => new Constructor(...args), numberArgs);


export { arrayToArray, arrayToSpread, spreadToArray, spreadToSpread, constructorToArray, constructorToSpread };

