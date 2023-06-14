import { defaultCreateError } from "./defaultCreateError";


const throwIfLess = (value: number, minValue: number, createError: (message: string) => Error = defaultCreateError): void => {
    if (value < minValue) {
        throw createError(`The number must be at least ${minValue}.`);
    }
}


const throwIfNotInteger = (value: number, createError: (message: string) => Error = defaultCreateError): void => {
    if (!Number.isSafeInteger(value)) {
        throw createError("The number must be an integer.");
    }
}


export { throwIfLess, throwIfNotInteger };

