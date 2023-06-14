import { Interval } from "@/utils/Interval";


const enum TokenType {
    Plus = "+",
    Minus = "-",
    Star = "*",
    Bullet = "•",
    Cross = "×",
    Slash = "/",
    Obelus = "÷",
    Colon = ":",
    Circumflex = "^",
    DoubleStar = "**",
    Arrow = "↑",
    Hash = "#",
    Root = "√",
    LeftParen = "(",
    RightParen = ")",
    LessThan = "<",
    GreaterThan = ">",
    LeftAngleBracket = "⟨",
    RightAngleBracket = "⟩",
    LeftSingleGuillemet = "‹",
    RightSingleGuillemet = "›",
    LeftCeil = "⌈",
    RightCeil = "⌉",
    LeftFloor = "⌊",
    RightFloor = "⌋",
    LeftBrace = "{",
    RightBrace = "}",
    LeftBracket = "[",
    RightBracket = "]",
    CircumflexLeftBracket = "^[",
    Pipe = "|",
    Comma = ",",
    Number = "Number",
    Identifier = "Identifier",
    End = "\0"
}


class Token {
    public readonly interval: Interval;


    public constructor(type: TokenType, start: number);

    public constructor(type: TokenType, start: number, value: string);

    public constructor(
        public readonly type: TokenType,
        start: number,
        public readonly value = ""
    ) {
        const length = value === "" ? type.length : value.length;
        this.interval = new Interval(start, start + length);
    }


    public toString(): string {
        if (this.value === "") {
            return `"${this.type}" located from ${this.interval.start} to ${this.interval.end}`;
        }
        return `${this.type} ${this.value} located from ${this.interval.start} to ${this.interval.end}`;
    }


    public is(...types: TokenType[]): boolean {
        return types.includes(this.type);
    }
}


export { TokenType, Token };

