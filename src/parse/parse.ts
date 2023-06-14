import { Constant, Node, Variable } from "@/nodes";
import {
    BinaryOperatorTemplate, ConstantTemplate, FunctionTemplate, NamedConstantTemplate,
    UnaryOperatorTemplate, VariableTemplate
} from "@/templates";
import { Interval } from "@/utils/Interval";
import { ParsingError } from "./ParsingError";
import { Token, TokenType } from "./Token";
import { ParsingOptions, defaultOptions } from "./options";
import {
    BinaryOpetatorCreators, UnaryOperatorCreators, baseFunctionCreators, baseNamedConstants, binaryAdditiveCreators,
    binaryExponentialCreators, binaryMultiplicativeCreators, bracketsCreators, rightAngleBrackets,
    unaryExponentialCreators, unaryMultiplicativeCreators
} from "./parseSetting";
import { scan } from "./scan";


const getParser = (options: ParsingOptions): (text: string) => Node => {
    const additionalNamedConstants = options.additionalNamedConstants ?? defaultOptions.additionalNamedConstants;
    const additionalFunctionCreators = options.additionalFunctionCreators ?? defaultOptions.additionalFunctionCreators;
    const defaultNamedConstantGenerator = options.defaultNamedConstantGenerator ?? defaultOptions.defaultNamedConstantGenerator;
    const defaultConstantGenerator = options.defaultConstantGenerator ?? defaultOptions.defaultConstantGenerator;
    const defaultVariableGenerator = options.defaultVariableGenerator ?? defaultOptions.defaultVariableGenerator;
    const defaultUnaryOperatorGenerator = options.defaultUnaryOperatorGenerator ?? defaultOptions.defaultUnaryOperatorGenerator;
    const defaultBinaryOperatorGenerator = options.defaultBinaryOperatorGenerator ?? defaultOptions.defaultBinaryOperatorGenerator;
    const defaultFunctionGenerator = options.defaultFunctionGenerator ?? defaultOptions.defaultFunctionGenerator;


    return text => {
        const tokens = scan(text);
        let index = 0;
        const templateIdentifiers = new Set<string>();


        const peek = (offset = 0): Token => tokens[index + offset] ?? tokens.at(-1);


        const skip = (offset = 1): void => {
            index += offset;
        }


        const throw_ = (message: string, interval: Interval): never => {
            throw new ParsingError(message, text, interval);
        }


        const isAndSkip = (token: Token, ...types: TokenType[]): boolean => {
            if (token.is(...types)) {
                skip();
                return true;
            }
            return false;
        }


        const isAndSkipOrThrow = (token: Token, ...types: TokenType[]): boolean => {
            if (token.is(...types)) {
                skip();
                return true;
            }

            if (types.length === 1) {
                return throw_(`Expected '${types[0]}'.`, token.interval);
            }
            const typesString = types
                .map(t => `'${t}'`)
                .join(", ");
            return throw_(`One of ${typesString} was expected.`, token.interval);
        }


        const parseTemplateDefinition = (expectedTemplateName: string): string | null => {
            const leftBracketToken = peek(0);
            const templateNameToken = peek(1);
            const isTemplateDefinition = (
                leftBracketToken.is(TokenType.LessThan, TokenType.LeftAngleBracket, TokenType.LeftSingleGuillemet)
                && templateNameToken.is(TokenType.Identifier)
                && templateNameToken.value === expectedTemplateName
            );
            if (!isTemplateDefinition) {
                return null;
            }
            skip(2); // Skip left bracket and template name.

            const identifierToken = peek();
            isAndSkipOrThrow(identifierToken, TokenType.Identifier);
            const identifier = identifierToken.value;
            if (templateIdentifiers.has(identifier)) {
                return throw_(`Duplicate identifier template '${identifier}.`, identifierToken.interval);
            }
            templateIdentifiers.add(identifier);

            isAndSkipOrThrow(peek(), rightAngleBrackets[leftBracketToken.type]!);

            return identifier;
        }


        const parseBinaryAdditive = (): Node => parseLeftBinaryOperator(binaryAdditiveCreators, parseBinaryMultiplicative);

        const parseBinaryMultiplicative = (): Node => parseLeftBinaryOperator(binaryMultiplicativeCreators, parseUnaryMultiplicative);

        const parseUnaryMultiplicative = (): Node => parseUnaryOperator(unaryMultiplicativeCreators, parseBinaryExponential);

        const parseBinaryExponential = (): Node => parseRightBinaryOperator(binaryExponentialCreators, parseUnaryExponential);

        const parseUnaryExponential = (): Node => parseUnaryOperator(unaryExponentialCreators, parseBinaryTemplate);

        const parseBinaryTemplate = (): Node => {
            let firstOperand = parseUnaryTemplate();
            let identifier = parseTemplateDefinition("BT");
            while (identifier !== null) {
                const secondOperand = parseUnaryTemplate();
                firstOperand = new BinaryOperatorTemplate(firstOperand, secondOperand, defaultBinaryOperatorGenerator, identifier);
                identifier = parseTemplateDefinition("BT");
            }
            return firstOperand;
        }

        const parseUnaryTemplate = (): Node => {
            const identifier = parseTemplateDefinition("UT");
            if (identifier === null) {
                return parseFunctionTemplate();
            }
            const operand = parseFunctionTemplate();
            return new UnaryOperatorTemplate(operand, defaultUnaryOperatorGenerator, identifier);
        }


        const parseLeftBinaryOperator = (creators: BinaryOpetatorCreators, parseHigher: () => Node): Node => {
            let firstOperand = parseHigher();
            const operatorToken = peek();
            let create = creators[operatorToken.type];
            while (create !== undefined) {
                skip();
                const secondOperand = parseHigher();
                firstOperand = create(firstOperand, secondOperand);
                const operatorToken = peek();
                create = creators[operatorToken.type];
            }
            return firstOperand;
        }


        const parseRightBinaryOperator = (creators: BinaryOpetatorCreators, parseHigher: () => Node): Node => {
            let firstOperand = parseHigher();
            const operatorToken = peek();
            let create = creators[operatorToken.type];
            while (create !== undefined) {
                skip();
                const secondOperand = parseRightBinaryOperator(creators, parseHigher);
                firstOperand = create(firstOperand, secondOperand);
                const operatorToken = peek();
                create = creators[operatorToken.type];
            }
            return firstOperand;
        }


        const parseUnaryOperator = (creators: UnaryOperatorCreators, parseHigher: () => Node): Node => {
            const operatorToken = peek();
            const create = creators[operatorToken.type];
            if (create === undefined) {
                return parseHigher();
            }
            skip();
            const operand = parseHigher();
            return create(operand);
        }


        const parseParameters = (expectedNumberArgs: number | undefined): Node[] => {
            const leftParenToken = peek();
            isAndSkipOrThrow(leftParenToken, TokenType.LeftParen);
            const rightParenToken = peek();
            if (isAndSkip(rightParenToken, TokenType.RightParen)) {
                if (expectedNumberArgs === undefined || expectedNumberArgs === 0) {
                    return [];
                }
                const interval = new Interval(leftParenToken.interval.start, rightParenToken.interval.end);
                return throw_(`Expected ${expectedNumberArgs} parameters but received 0.`, interval);
            }

            const parameters: Node[] = [];
            let token: Token;
            do {
                parameters.push(parse());
                token = peek();
            } while (isAndSkip(token, TokenType.Comma));

            isAndSkipOrThrow(token, TokenType.RightParen);
            if (expectedNumberArgs === undefined || expectedNumberArgs === parameters.length) {
                return parameters;
            }
            const interval = new Interval(leftParenToken.interval.start, token.interval.end);
            return throw_(`Expected ${expectedNumberArgs} parameters but received ${parameters.length}.`, interval);
        }


        const parseFunctionTemplate = (): Node => {
            const identifier = parseTemplateDefinition("FT");
            if (identifier === null) {
                return parseFunction();
            }
            const parameters = parseParameters(undefined);
            return new FunctionTemplate(parameters, defaultFunctionGenerator, identifier);
        }


        const parseFunction = (): Node => {
            const identifierToken = peek();
            if (!identifierToken.is(TokenType.Identifier)) {
                return parseTerm();
            }

            const functionName = identifierToken.value;
            const creator = additionalFunctionCreators[functionName] ?? baseFunctionCreators[functionName];
            if (creator === undefined) {
                if (peek(1).is(TokenType.LeftParen)) {
                    return throw_(`Unknown function '${functionName}'.`, identifierToken.interval);
                }
                return parseTerm();
            }
            skip(1); // Skip identifier.

            const parameters = parseParameters(creator.numberArgs);
            return creator.create(parameters);
        }


        const parseTerm = (): Node => {
            const token = peek();

            if (isAndSkip(token, TokenType.Number)) {
                return new Constant(Number(token.value));
            }

            if (isAndSkip(token, TokenType.Identifier)) {
                const identifier = token.value;
                const lowerCaseIdentifier = identifier.toLowerCase();
                return (
                    additionalNamedConstants[lowerCaseIdentifier]
                    ?? baseNamedConstants[lowerCaseIdentifier]
                    ?? new Variable(identifier)
                );
            }

            for (const creator of bracketsCreators) {
                if (isAndSkip(peek(), creator.leftBracket)) {
                    const node = parse();
                    isAndSkipOrThrow(peek(), creator.rightBracket);
                    return creator.create(node);
                }
            }

            let templateIdentifier = parseTemplateDefinition("NCT");
            if (templateIdentifier !== null) {
                return new NamedConstantTemplate(defaultNamedConstantGenerator, templateIdentifier);
            }

            templateIdentifier = parseTemplateDefinition("CT");
            if (templateIdentifier !== null) {
                return new ConstantTemplate(defaultConstantGenerator, templateIdentifier);
            }

            templateIdentifier = parseTemplateDefinition("VT");
            if (templateIdentifier !== null) {
                return new VariableTemplate(defaultVariableGenerator, templateIdentifier);
            }

            return throw_("Invalid syntax.", token.interval)
        }


        const parse = parseBinaryAdditive;
        return parse();
    }
}


const defaultParse = getParser({});


export { defaultParse, getParser };

