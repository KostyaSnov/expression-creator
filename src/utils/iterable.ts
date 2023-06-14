const min = <T>(values: Iterable<T>, convert: (value: T) => number = Number): T | null => {
    let min: T | null = null;
    let numberMin = Infinity;
    for (const value of values) {
        const numberValue = convert(value);
        if (min === null || numberValue < numberMin) {
            min = value;
            numberMin = numberValue;
        }
    }
    return min;
}


const max = <T>(values: Iterable<T>, convert: (value: T) => number = Number): T | null => {
    let max: T | null = null;
    let numberMax = -Infinity;
    for (const value of values) {
        const numberValue = convert(value);
        if (max === null || numberValue > numberMax) {
            max = value;
            numberMax = numberValue;
        }
    }
    return max;
}


const sum = <T>(values: Iterable<T>, convert: (value: T) => number = Number): number => {
    let sum = 0;
    for (const value of values) {
        sum += convert(value);
    }
    return sum;
}


export { max, min, sum };

