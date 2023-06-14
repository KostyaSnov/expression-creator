const enum RawDecimalSeparator {
    Point = ".",
    Comma = ","
}


const enum RawMultiplicationSign {
    Bullet = "•",
    Cross = "×",
    Star = "*"
}


const enum RawDivisionSign {
    Obelus = "÷",
    Slash = "/",
    Colon = ":"
}


const enum RawPowerSign {
    Circumflex = "^",
    DoubleStar = "**",
    Arrow = "↑"
}


const enum RawRootSign {
    Root = "√",
    Hash = "#"
}


const enum RawAngleBracketsSign {
    Regular,
    LessGreaterThan,
    SingleGuillemets
}


interface RawWritingOptionsBase {
    decimalSeparator: string;
    multiplicationSign: string;
    divisionSign: string;
    powerSign: string;
    rootSign: string;
    angleBracketSign: RawAngleBracketsSign;
    space: string;
}


type RawWritingOptions = {
    readonly [K in keyof RawWritingOptionsBase]?: RawWritingOptionsBase[K];
}


type RequiredOptions = {
    readonly [K in keyof RawWritingOptionsBase]: RawWritingOptionsBase[K];
}


const defaultOptions: RequiredOptions = {
    decimalSeparator: RawDecimalSeparator.Comma,
    multiplicationSign: RawMultiplicationSign.Star,
    divisionSign: RawDivisionSign.Slash,
    powerSign: RawPowerSign.Circumflex,
    rootSign: RawRootSign.Root,
    angleBracketSign: RawAngleBracketsSign.Regular,
    space: ""
};


export {
    RawAngleBracketsSign, RawDecimalSeparator, RawDivisionSign, RawMultiplicationSign, RawPowerSign, RawRootSign, RawWritingOptions, defaultOptions
};

