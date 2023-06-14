import { isDigit, isLetter } from "@/utils/checks";
import { ArgumentError } from "@/utils/errors";


const validateIdentifier = (identifier: string): void => {
    if (identifier.length === 0) {
        throw new ArgumentError("Identifier cannot be empty.", "identifier")
    }

    const firstChar = identifier[0];
    if (!isLetter(firstChar)) {
        throw new ArgumentError(`The first character of the identifier must be a letter, not '${firstChar}'.`, "identifier")
    }

    for (let i = 1; i < identifier.length; ++i) {
        const char = identifier[i];
        if (!isLetter(char) && !isDigit(char)) {
            throw new ArgumentError(`Character of the identifier must be a letter or a digit, not '${char}' at ${i}.`, "identifier");
        }
    }
}


export { validateIdentifier };

