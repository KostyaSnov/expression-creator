const enum LatexDecimalSeparator {
    Comma = ",\\!",
    Point = "."
}


const enum LatexMultiplicationSign {
    Cdot = "\\cdot",
    Bullet = "\\bullet",
    Times = "\\times",
    Asterisk = "\\ast",
    Star = "*"
}


const enum LatexDivisionSign {
    Vertical = "\\frac",
    Diagonal = "\\sfrac",
    Obelus = "\\div",
    Slash = "/",
    Colon = ":"
}


interface LatexWritingOptionsBase {
    decimalSeparator: string;
    multiplicationSign: string;
    divisionSign: string;
}


type LatexWritingOptions = {
    readonly [K in keyof LatexWritingOptionsBase]?: LatexWritingOptionsBase[K];
}


type RequiredOptions = {
    readonly [K in keyof LatexWritingOptionsBase]: LatexWritingOptionsBase[K];
};


const defaultOptions: RequiredOptions = {
    decimalSeparator: LatexDecimalSeparator.Comma,
    multiplicationSign: LatexMultiplicationSign.Cdot,
    divisionSign: LatexDivisionSign.Vertical
}


export { LatexDivisionSign, LatexMultiplicationSign, LatexWritingOptions, defaultOptions };

