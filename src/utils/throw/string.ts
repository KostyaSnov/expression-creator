import { defaultCreateError } from "./defaultCreateError";


const throwIfNotChar = (string: string, createError: (message: string) => Error = defaultCreateError): void => {
    if (string.length !== 1) {
        createError(`The char must have length 1.`);
    }
}


const throwIfLengthLess = (string: string, minLength: number, createError: (message: string) => Error = defaultCreateError): void => {
    if (string.length < minLength) {
        createError(`The string must have a length of at least ${minLength}.`);
    }
}


export { throwIfLengthLess, throwIfNotChar };

