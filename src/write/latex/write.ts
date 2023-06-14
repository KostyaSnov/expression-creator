import {
    Addition, BinaryOperator, Ceil, Constant, Division, Floor, FractionalPart,
    Function, Logarithm, Minus, Modulus, Multiplication, NamedConstant,
    Node, Plus, Power, Root, SquareRoot, Subtraction, UnaryOperator, Variable
} from "@/nodes";
import { BinaryOperatorTemplate, FunctionTemplate, PrimaryTemplate, Template, UnaryOperatorTemplate } from "@/templates";
import { Priority, getPriority, maxPriority } from "../shared/Priority";
import { getBinaryOperatorSign, getFunctionName, getTemplateName, getUnaryOperatorSign } from "../shared/names";
import { throwNotSupported } from "../shared/throwNotSupported";
import { LatexDivisionSign, LatexWritingOptions, defaultOptions } from "./options";
import { namedConstantLatexMap } from "./setting";


const getLatexWriter = (options: LatexWritingOptions): (node: Node) => string => {
    const decimalSeparator = options.decimalSeparator ?? defaultOptions.decimalSeparator;
    const multiplicationSign = options.multiplicationSign ?? defaultOptions.multiplicationSign;
    const divisionSign = options.divisionSign ?? defaultOptions.divisionSign;


    const writeAndMaybeSetParens = (node: Node, maxPriority: Priority): string => getPriority(node) <= maxPriority
        ? setBrackets(write(node), "(", ")")
        : write(node);


    const defaultWriteUnary = (
        unaryOperator: UnaryOperator | UnaryOperatorTemplate,
        operandMaxPriority: Priority,
        sign: string
    ): string => {
        const operandString = writeAndMaybeSetParens(unaryOperator.operand, operandMaxPriority);
        return sign + operandString;
    }


    const defaultWriteBinary = (
        binaryOperator: BinaryOperator | BinaryOperatorTemplate,
        firstOperandMaxPriority: Priority,
        secondOperandMaxPriority: Priority,
        sign: string
    ): string => {
        const firstOperandString = writeAndMaybeSetParens(binaryOperator.firstOperand, firstOperandMaxPriority);
        const secondOperandString = writeAndMaybeSetParens(binaryOperator.secondOperand, secondOperandMaxPriority);
        return `${firstOperandString}\\mathbin{${sign}}${secondOperandString}`;
    }


    const writeDivision: (division: Division) => string = divisionSign === LatexDivisionSign.Vertical || divisionSign === LatexDivisionSign.Diagonal
        ? division => {
            const dividendString = write(division.dividend);
            const divisorString = write(division.divisor);
            return `${divisionSign}{${dividendString}}{${divisorString}}`;
        }
        : division => {
            return defaultWriteBinary(division, maxPriority.divisionFirstOperand, maxPriority.divisionSecondOperand, divisionSign);
        }


    const defaultWriteFunction = (name: string, parameters: readonly Node[]): string => {
        if (parameters.length === 1) {
            const argumentString = writeAndMaybeSetParens(parameters[0], Priority.Function);
            return `\\operatorname{${name}}{${argumentString}}`;
        }
        const parametersString = parameters
            .map(p => write(p))
            .join(", ");
        return `\\operatorname{${name}}${setBrackets(parametersString, "(", ")")}`;
    }


    const write = (node: Node): string => {
        // Primary.
        if (node instanceof NamedConstant) {
            return namedConstantLatexMap.get(node) ?? node.name;
        }
        if (node instanceof Constant) {
            return node.value.toString().replace(".", decimalSeparator);
        }
        if (node instanceof Variable) {
            return node.name;
        }

        // UnaryOperator.
        if (node instanceof Plus) {
            return defaultWriteUnary(node, maxPriority.plusOperand, getUnaryOperatorSign(node));
        }
        if (node instanceof Minus) {
            return defaultWriteUnary(node, maxPriority.minusOperand, getUnaryOperatorSign(node));
        }
        if (node instanceof SquareRoot) {
            const radicandString = write(node.radicand);
            return `\\sqrt{${radicandString}}`;
        }

        // BinaryOperator.
        if (node instanceof Addition) {
            return defaultWriteBinary(node, maxPriority.additionFirstOperand, maxPriority.additionSecondOperand, getBinaryOperatorSign(node));
        }
        if (node instanceof Subtraction) {
            return defaultWriteBinary(node, maxPriority.subtractionFirstOperand, maxPriority.subtractionSecondOperand, getBinaryOperatorSign(node));
        }
        if (node instanceof Multiplication) {
            return defaultWriteBinary(node, maxPriority.multiplicationFirstOperand, maxPriority.multiplicationSecondOperand, multiplicationSign);
        }
        if (node instanceof Division) {
            return writeDivision(node);
        }
        if (node instanceof Power) {
            const baseString = writeAndMaybeSetParens(node.base, Priority.Function);
            const exponentString = write(node.exponent);
            return `${baseString}^{${exponentString}}`;
        }
        if (node instanceof Root) {
            const radicandString = write(node.radicand);
            const degreeString = write(node.degree);
            return `\\sqrt[{${degreeString}}]{${radicandString}}`;
        }

        // Function.
        if (node instanceof Logarithm) {
            const baseString = writeAndMaybeSetParens(node.base, Priority.Function);
            const argumentString = writeAndMaybeSetParens(node.argument, Priority.Function);
            return `\\log_{${baseString}}{${argumentString}}`;
        }
        if (node instanceof Modulus) {
            return setBrackets(write(node.argument), "|", "|");
        }
        if (node instanceof Ceil) {
            return setBrackets(write(node.argument), "\\lceil", "\\rceil");
        }
        if (node instanceof Floor) {
            return setBrackets(write(node.argument), "\\lfloor", "\\rfloor");
        }
        if (node instanceof FractionalPart) {
            return setBrackets(write(node.argument), "\\{", "\\}");
        }
        if (node instanceof Function) {
            return defaultWriteFunction(getFunctionName(node), node.parameters);
        }

        // Template.
        if (node instanceof PrimaryTemplate) {
            return writeTemplateName(node);
        }
        if (node instanceof UnaryOperatorTemplate) {
            return defaultWriteUnary(node, maxPriority.unaryOperatorTemplateOperand, writeTemplateName(node));
        }
        if (node instanceof BinaryOperatorTemplate) {
            return defaultWriteBinary(node, maxPriority.binaryOperatorTemplateFirstOperand, maxPriority.binaryOperatorTemplateSecondOperand, writeTemplateName(node));
        }
        if (node instanceof FunctionTemplate) {
            return defaultWriteFunction(writeTemplateName(node), node.parameters);
        }

        return throwNotSupported(node);
    }

    return write;
}


const setBrackets = (text: string, leftBracket: string, rightBracket: string): string => {
    return `\\left${leftBracket} ${text} \\right${rightBracket}`;
}


const writeTemplateName = (template: Template): string => {
    const templateName = `\\operatorname{${getTemplateName(template)}}`;
    const fullName = template.identifier === undefined
        ? templateName
        : `${templateName}\\middle|${template.identifier}`;
    return setBrackets(fullName, "\\langle", "\\rangle");
}


const defaultLatexWrite = getLatexWriter({});


export { getLatexWriter, defaultLatexWrite };

