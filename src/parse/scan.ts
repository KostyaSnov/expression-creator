import { Interval } from "@/utils/Interval";
import { isDigit, isLetter, isSpace } from "@/utils/checks";
import { ParsingError } from "./ParsingError";
import { Token, TokenType } from "./Token";
import { maxLengthSimpleLexeme, simpleLexemes } from "./scanSetting";


const scan = (text: string): Token[] => {
    let position = 0;


    const peek = (offset = 0): string => text[position + offset] ?? "\0";


    const peekString = (length: number, offset = 0): string => {
        const start = position + offset;
        if (start >= text.length) {
            return "\0".repeat(length);
        }

        const end = start + length;
        if (end >= text.length) {
            return text.slice(start) + "\0".repeat(end - text.length);
        }

        return text.slice(start, end);
    }


    const skip = (offset = 1): void => {
        position += offset;
    }


    const throw_ = (message: string, interval: Interval): never => {
        throw new ParsingError(message, text, interval);
    }


    const scanSimpleLexeme = (): Token | null => {
        const tokenPosition = position;
        const fullLexeme = peekString(maxLengthSimpleLexeme);
        for (let i = maxLengthSimpleLexeme; i > 0; --i) {
            const tokenType = fullLexeme.slice(0, i) as TokenType;
            if (simpleLexemes.includes(tokenType)) {
                skip(i);
                return new Token(tokenType, tokenPosition);
            }
        }
        return null;
    }


    const scanNaturalNumber = (): string => {
        let value = "";
        let digit = peek();
        do {
            value += digit;
            skip();
            digit = peek();
        } while (isDigit(digit));
        return value;
    }


    const scanFractionalPart = (): string => {
        const separator = peek(0);
        const firstDigit = peek(1);
        if ((separator === "," || separator === ".") && isDigit(firstDigit)) {
            skip(); // Skip 'separator'.
            return `.${scanNaturalNumber()}`;
        }
        return "";
    }


    const scanNumber = (): Token | null => {
        const tokenPosition = position;
        const firstDigit = peek();

        if (firstDigit === "0") {
            skip();
            let numberDigitsAfterZero = 0;
            while (isDigit(peek(numberDigitsAfterZero++))) { }
            if (numberDigitsAfterZero !== 0) {
                const interval = new Interval(position, position + numberDigitsAfterZero);
                return throw_("A number starting with zero cannot have numbers after zero.", interval);
            }

            const value = "0" + scanFractionalPart();
            return new Token(TokenType.Number, tokenPosition, value);
        }

        if (isDigit(firstDigit)) {
            const value = scanNaturalNumber() + scanFractionalPart();
            return new Token(TokenType.Number, tokenPosition, value);
        }

        return null;
    }


    const scanIdentifier = (): Token | null => {
        let char = peek();
        if (!isLetter(char)) {
            return null;
        }

        const tokenPosition = position;
        let value = ""
        do {
            value += char;
            skip();
            char = peek();
        } while (isLetter(char) || isDigit(char))
        return new Token(TokenType.Identifier, tokenPosition, value);
    }


    const scanFunctions = [scanNumber, scanIdentifier, scanSimpleLexeme];

    const scanNext = (): Token => {
        for (const scanFunction of scanFunctions) {
            const token = scanFunction();
            if (token !== null) {
                return token;
            }
        }
        const interval = new Interval(position, position + 1);
        return throw_("Unknown character.", interval);
    }


    const tokens: Token[] = [];
    let token: Token;
    do {
        while (isSpace(peek())) {
            skip();
        }
        token = scanNext();
        tokens.push(token);
    } while (!token.is(TokenType.End));
    return tokens;
}


export { scan };

