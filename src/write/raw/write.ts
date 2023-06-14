import {
    Addition, BinaryOperator, Ceil, Constant, Division, Floor, FractionalPart, Function,
    Minus, Modulus, Multiplication, NamedConstant, Node, Plus, Power, Root, SquareRoot,
    Subtraction, UnaryOperator, Variable
} from "@/nodes";
import {
    BinaryOperatorTemplate, FunctionTemplate, PrimaryTemplate, Template,
    UnaryOperatorTemplate
} from "@/templates";
import { Priority, getPriority, maxPriority } from "../shared/Priority";
import { getBinaryOperatorSign, getFunctionName, getTemplateName, getUnaryOperatorSign } from "../shared/names";
import { throwNotSupported } from "../shared/throwNotSupported";
import { RawWritingOptions, defaultOptions } from "./options";
import { angleBracketsSignNames } from "./settings";


const getRawWriter = (options: RawWritingOptions): (node: Node) => string => {
    const decimalSeparator = options.decimalSeparator ?? defaultOptions.decimalSeparator;
    const multiplicationSign = options.multiplicationSign ?? defaultOptions.multiplicationSign;
    const divisionSign = options.divisionSign ?? defaultOptions.divisionSign;
    const powerSign = options.powerSign ?? defaultOptions.powerSign;
    const rootSign = options.rootSign ?? defaultOptions.rootSign;
    const space = options.space ?? defaultOptions.space;

    const angleBracketSign = options.angleBracketSign ?? defaultOptions.angleBracketSign;
    const [leftAngleBracket, rightAngleBracket] = angleBracketsSignNames[angleBracketSign];


    const writeAndMaybeSetParens = (node: Node, maxPriority: Priority): string => getPriority(node) <= maxPriority
        ? `(${write(node)})`
        : write(node);


    const writeUnary = (
        unary: UnaryOperator | UnaryOperatorTemplate,
        operandMaxPriority: Priority,
        sign: string
    ): string => {
        const operandString = writeAndMaybeSetParens(unary.operand, operandMaxPriority);
        return sign + operandString;
    }


    const writeBinary = (
        binary: BinaryOperator | BinaryOperatorTemplate,
        firstOperandMaxPriority: Priority,
        secondOperandMaxPriority: Priority,
        sign: string
    ): string => {
        const firstOperandString = writeAndMaybeSetParens(binary.firstOperand, firstOperandMaxPriority);
        const secondOperandString = writeAndMaybeSetParens(binary.secondOperand, secondOperandMaxPriority);
        return firstOperandString + space + sign + space + secondOperandString;
    }


    const writeTemplateName = (template: Template): string => {
        const templateName = getTemplateName(template);
        const fullName = template.identifier === undefined
            ? templateName
            : `${templateName} ${template.identifier}`;
        return leftAngleBracket + fullName + rightAngleBracket;
    }


    const writeFunction = (name: string, parameters: readonly Node[]): string => {
        const parametersString = parameters
            .map(p => write(p))
            .join(`,${space}`);
        return `${name}(${parametersString})`;
    }


    const write = (node: Node): string => {
        // Primary.
        if (node instanceof NamedConstant) {
            return node.name;
        }
        if (node instanceof Constant) {
            return node.value.toString().replace(".", decimalSeparator);
        }
        if (node instanceof Variable) {
            return node.name;
        }

        // UnaryOperator.
        if (node instanceof Plus) {
            return writeUnary(node, maxPriority.plusOperand, getUnaryOperatorSign(node));
        }
        if (node instanceof Minus) {
            return writeUnary(node, maxPriority.minusOperand, getUnaryOperatorSign(node));
        }
        if (node instanceof SquareRoot) {
            return writeUnary(node, maxPriority.squareRootOperand, rootSign);
        }

        // BinaryOperator.
        if (node instanceof Addition) {
            return writeBinary(node, maxPriority.additionFirstOperand, maxPriority.additionSecondOperand, getBinaryOperatorSign(node));
        }
        if (node instanceof Subtraction) {
            return writeBinary(node, maxPriority.subtractionFirstOperand, maxPriority.subtractionSecondOperand, getBinaryOperatorSign(node));
        }
        if (node instanceof Multiplication) {
            return writeBinary(node, maxPriority.multiplicationFirstOperand, maxPriority.multiplicationSecondOperand, multiplicationSign);
        }
        if (node instanceof Division) {
            return writeBinary(node, maxPriority.divisionFirstOperand, maxPriority.divisionSecondOperand, divisionSign);
        }
        if (node instanceof Power) {
            return writeBinary(node, maxPriority.powerFirstOperand, maxPriority.powerSecondOperand, powerSign);
        }
        if (node instanceof Root) {
            return writeBinary(node, maxPriority.rootFirstOperand, maxPriority.rootSecondOperand, rootSign);
        }

        // Function.
        if (node instanceof Modulus) {
            return `|${write(node.argument)}|`;
        }
        if (node instanceof Ceil) {
            return `⌈${write(node.argument)}⌉`;
        }
        if (node instanceof Floor) {
            return `⌊${write(node.argument)}⌋`;
        }
        if (node instanceof FractionalPart) {
            return `{${write(node.argument)}}`;
        }
        if (node instanceof Function) {
            return writeFunction(getFunctionName(node), node.parameters);
        }

        // Template.
        if (node instanceof PrimaryTemplate) {
            return writeTemplateName(node);
        }
        if (node instanceof UnaryOperatorTemplate) {
            return writeUnary(node, maxPriority.unaryOperatorTemplateOperand, writeTemplateName(node));
        }
        if (node instanceof BinaryOperatorTemplate) {
            return writeBinary(node, maxPriority.binaryOperatorTemplateFirstOperand, maxPriority.binaryOperatorTemplateSecondOperand, writeTemplateName(node));
        }

        if (node instanceof FunctionTemplate) {
            return writeFunction(writeTemplateName(node), node.parameters);
        }

        return throwNotSupported(node);
    }


    return write;
}


const defaultRawWrite = getRawWriter({});


export { defaultRawWrite, getRawWriter };

