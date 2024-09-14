import {
    Addition, Arccosecant, Arccosine, Arccotangent, Arcosecant, Arcosine, Arcotangent,
    Arcsecant, Arcsine, Arctangent, Arsecant, Arsine, Artangent, BinaryOperator, Ceil,
    CommonLogarithm, Cosecant, Cosine, Cotangent, Division, E, Floor, FractionalPart,
    Function, HyperbolicCosecant, HyperbolicCosine, HyperbolicCotangent,
    HyperbolicSecant, HyperbolicSine, HyperbolicTangent, Logarithm, Minus, Modulus,
    Multiplication, NamedConstant, NaturalLogarithm, Node, PI, Plus, Power, Root,
    Secant, Sign, Sine, SquareRoot, Subtraction, Tangent, UnaryOperator
} from "@/nodes";
import { constructorToArray, constructorToSpread } from "@/utils/args";
import { TokenType } from "./Token";


type BinaryOperatorCreator = (firstOperand: Node, secondOperand: Node) => BinaryOperator;
type BinaryOpetatorCreators = Readonly<Partial<Record<TokenType, BinaryOperatorCreator>>>;

const binaryAdditiveCreators: BinaryOpetatorCreators = {
    [TokenType.Plus]: constructorToSpread(Addition),
    [TokenType.Minus]: constructorToSpread(Subtraction)
};

const createMultiplication = constructorToSpread(Multiplication);
const createDivision = constructorToSpread(Division);
const binaryMultiplicativeCreators: BinaryOpetatorCreators = {
    [TokenType.Star]: createMultiplication,
    [TokenType.Bullet]: createMultiplication,
    [TokenType.Cross]: createMultiplication,
    [TokenType.Slash]: createDivision,
    [TokenType.Obelus]: createDivision,
    [TokenType.Colon]: createDivision
};

const createPower = constructorToSpread(Power);
const createRoot = constructorToSpread(Root);
const binaryExponentialCreators: BinaryOpetatorCreators = {
    [TokenType.Circumflex]: createPower,
    [TokenType.DoubleStar]: createPower,
    [TokenType.Arrow]: createPower,
    [TokenType.Hash]: createRoot,
    [TokenType.Root]: createRoot
};


type UnaryOperatorCreator = (operand: Node) => UnaryOperator;
type UnaryOperatorCreators = Readonly<Partial<Record<TokenType, UnaryOperatorCreator>>>;

const unaryMultiplicativeCreators: UnaryOperatorCreators = {
    [TokenType.Plus]: constructorToSpread(Plus),
    [TokenType.Minus]: constructorToSpread(Minus)
};

const createSquareRoot = constructorToSpread(SquareRoot);
const unaryExponentialCreators: UnaryOperatorCreators = {
    [TokenType.Hash]: createSquareRoot,
    [TokenType.Root]: createSquareRoot
};


const baseNamedConstants: Readonly<Partial<Record<string, NamedConstant>>> = {
    pi: PI,
    пі: PI,
    π: PI,
    e: E,
    е: E,
};


type FunctionCreator = Readonly<{
    create(parameters: Node[]): Function,
    numberArgs?: number
}>;
type FunctionCreators = Readonly<Partial<Record<string, FunctionCreator>>>;
const getFunctionCreator = (
    constructor: new (...args: Node[]) => Function,
    numberArgs = 1
): FunctionCreator => ({
    create: constructorToArray(constructor),
    numberArgs
});

const tangentCreator = getFunctionCreator(Tangent);
const cotangentCreator = getFunctionCreator(Cotangent);
const cosecantCreator = getFunctionCreator(Cosecant);

const arcsineCreator = getFunctionCreator(Arcsine);
const arccosineCreator = getFunctionCreator(Arccosine);
const arcsecantCreator = getFunctionCreator(Arcsecant);
const arccosecantCreator = getFunctionCreator(Arccosecant);
const arctangentCreator = getFunctionCreator(Arctangent,);
const arccotangentCreator = getFunctionCreator(Arccotangent);

const hyperbolicSineCreator = getFunctionCreator(HyperbolicSine);
const hyperbolicCosineCreator = getFunctionCreator(HyperbolicCosine);
const hyperbolicSecantCreator = getFunctionCreator(HyperbolicSecant);
const hyperbolicCosecantCreator = getFunctionCreator(HyperbolicCosecant);
const hyperbolicTangentCreator = getFunctionCreator(HyperbolicTangent);
const hyperbolicCotangentCreator = getFunctionCreator(HyperbolicCotangent);

const arsineCreator = getFunctionCreator(Arsine);
const arcosineCreator = getFunctionCreator(Arcosine);
const arsecantCreator = getFunctionCreator(Arsecant);
const arcosecantCreator = getFunctionCreator(Arcosecant);
const artangentCreator = getFunctionCreator(Artangent);
const arcotangentCreator = getFunctionCreator(Arcotangent);

const signCreator = getFunctionCreator(Sign);

const baseFunctionCreators: FunctionCreators = {
    ln: getFunctionCreator(NaturalLogarithm),
    lg: getFunctionCreator(CommonLogarithm),
    log: getFunctionCreator(Logarithm, 2),

    sin: getFunctionCreator(Sine),
    cos: getFunctionCreator(Cosine),
    tg: tangentCreator,
    tan: tangentCreator,
    sec: getFunctionCreator(Secant),
    cosec: cosecantCreator,
    csc: cosecantCreator,
    ctg: cotangentCreator,
    cot: cotangentCreator,
    cotan: cotangentCreator,

    asin: arcsineCreator,
    arcsin: arcsineCreator,
    acos: arccosineCreator,
    arccos: arccosineCreator,
    asec: arcsecantCreator,
    arcsec: arcsecantCreator,
    acosec: arccosecantCreator,
    arccosec: arccosecantCreator,
    acsc: arccosecantCreator,
    arccsc: arccosecantCreator,
    atg: arctangentCreator,
    arctg: arctangentCreator,
    atan: arctangentCreator,
    arctan: arctangentCreator,
    actg: arccotangentCreator,
    arcctg: arccotangentCreator,
    acot: arccotangentCreator,
    arccot: arccotangentCreator,
    acotan: arccotangentCreator,
    arccotan: arccotangentCreator,

    sh: hyperbolicSineCreator,
    sinh: hyperbolicSineCreator,
    ch: hyperbolicCosineCreator,
    cosh: hyperbolicCosineCreator,
    sch: hyperbolicSecantCreator,
    sech: hyperbolicSecantCreator,
    csch: hyperbolicCosecantCreator,
    cosech: hyperbolicCosecantCreator,
    th: hyperbolicTangentCreator,
    tanh: hyperbolicTangentCreator,
    cth: hyperbolicCotangentCreator,
    coth: hyperbolicCotangentCreator,

    ash: arsineCreator,
    arsh: arsineCreator,
    asinh: arsineCreator,
    arsinh: arsineCreator,
    ach: arcosineCreator,
    arch: arcosineCreator,
    acosh: arcosineCreator,
    arcosh: arcosineCreator,
    asch: arsecantCreator,
    arsch: arsecantCreator,
    asech: arsecantCreator,
    arsech: arsecantCreator,
    acsch: arcosecantCreator,
    arcsch: arcosecantCreator,
    acosech: arcosecantCreator,
    arcosech: arcosecantCreator,
    ath: artangentCreator,
    arth: artangentCreator,
    atanh: artangentCreator,
    artanh: artangentCreator,
    acth: arcotangentCreator,
    arcth: arcotangentCreator,
    acoth: arcotangentCreator,
    arcoth: arcotangentCreator,

    sgn: signCreator,
    sign: signCreator
};


const rightAngleBrackets: Readonly<Partial<Record<TokenType, TokenType>>> = {
    [TokenType.LessThan]: TokenType.GreaterThan,
    [TokenType.LeftAngleBracket]: TokenType.RightAngleBracket,
    [TokenType.LeftSingleGuillemet]: TokenType.RightSingleGuillemet
}


type BracketsCreator = Readonly<{
    leftBracket: TokenType,
    rightBracket: TokenType,
    create(node: Node): Node
}>;
const getBracketsCreator = (leftBracket: TokenType, rightBracket: TokenType, create: (node: Node) => Node): BracketsCreator => ({
    leftBracket, rightBracket, create
});

const createCeil = constructorToSpread(Ceil);
const createFloor = constructorToSpread(Floor);
const bracketsCreators: Iterable<BracketsCreator> = [
    getBracketsCreator(TokenType.LeftParen, TokenType.RightParen, node => node),
    getBracketsCreator(TokenType.LeftCeil, TokenType.RightCeil, createCeil),
    getBracketsCreator(TokenType.CircumflexLeftBracket, TokenType.RightBracket, createCeil),
    getBracketsCreator(TokenType.LeftFloor, TokenType.RightFloor, createFloor),
    getBracketsCreator(TokenType.LeftBracket, TokenType.RightBracket, createFloor),
    getBracketsCreator(TokenType.LeftBrace, TokenType.RightBrace, constructorToSpread(FractionalPart)),
    getBracketsCreator(TokenType.Pipe, TokenType.Pipe, constructorToSpread(Modulus))
];


export {
    BinaryOpetatorCreators, binaryAdditiveCreators, binaryMultiplicativeCreators, binaryExponentialCreators,
    UnaryOperatorCreators, unaryMultiplicativeCreators, unaryExponentialCreators, baseNamedConstants,
    FunctionCreators, FunctionCreator, baseFunctionCreators, rightAngleBrackets, bracketsCreators
};

