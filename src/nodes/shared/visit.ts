const visit = <T, TValues extends Iterable<T>>(
    values: TValues,
    callback: ((value: T) => boolean | void) | undefined
): TValues | boolean => {
    if (callback === undefined) {
        return values;
    }
    for (const value of values) {
        if (callback(value)) {
            return true;
        }
    }
    return false;
}


export { visit };

