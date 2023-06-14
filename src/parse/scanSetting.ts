import { max } from "@/utils/iterable";
import { TokenType } from "./Token";


const simpleLexemes: readonly TokenType[] = [
    TokenType.Plus,
    TokenType.Minus,
    TokenType.Star,
    TokenType.Bullet,
    TokenType.Cross,
    TokenType.Slash,
    TokenType.Obelus,
    TokenType.Colon,
    TokenType.Circumflex,
    TokenType.DoubleStar,
    TokenType.Arrow,
    TokenType.Hash,
    TokenType.Root,
    TokenType.LeftParen,
    TokenType.RightParen,
    TokenType.LessThan,
    TokenType.GreaterThan,
    TokenType.LeftAngleBracket,
    TokenType.RightAngleBracket,
    TokenType.LeftSingleGuillemet,
    TokenType.RightSingleGuillemet,
    TokenType.LeftCeil,
    TokenType.RightCeil,
    TokenType.LeftFloor,
    TokenType.RightFloor,
    TokenType.LeftBrace,
    TokenType.RightBrace,
    TokenType.LeftBracket,
    TokenType.RightBracket,
    TokenType.CircumflexLeftBracket,
    TokenType.Pipe,
    TokenType.Comma,
    TokenType.End
];
const maxLengthSimpleLexeme = max(simpleLexemes, t => t.length)!.length;


export { simpleLexemes, maxLengthSimpleLexeme };

