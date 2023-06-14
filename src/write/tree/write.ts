import { ValueGenerator } from "@/generators";
import { BinaryOperator, Constant, Function, NamedConstant, Node, UnaryOperator, Variable } from "@/nodes";
import {
    BinaryOperatorTemplate, ConstantTemplate, FunctionTemplate, NamedConstantTemplate,
    Template, UnaryOperatorTemplate, VariableTemplate
} from "@/templates";
import { throwIfLess, throwIfNotChar, throwIfNotInteger } from "@/utils/throw";
import { getBinaryOperatorSign, getUnaryOperatorSign } from "../shared/names";
import { throwNotSupported } from "../shared/throwNotSupported";
import { TreeWritingOptions, defaultOptions } from "./options";


const getTreeWriter = (options: TreeWritingOptions): (node: Node) => string => {
    const indentLength = options.indentLength ?? defaultOptions.indentLength;
    throwIfLess(indentLength, 2); // The indent must be longer than 2 to accommodate 'vh', where 'v' is '_verticalSign', 'h' is '_horizontalSign'.
    throwIfNotInteger(indentLength);

    const baseDepth = options.baseDepth ?? defaultOptions.baseDepth;
    throwIfLess(baseDepth, 0);
    throwIfNotInteger(baseDepth);

    const newLine = options.newLine ?? defaultOptions.newLine;

    const horizontalSign = options.horizontalSign ?? defaultOptions.horizontalSign;
    throwIfNotChar(horizontalSign);

    const verticalSign = options.verticalSign ?? defaultOptions.verticalSign;
    throwIfNotChar(verticalSign);

    const spaceSign = options.spaceSign ?? defaultOptions.spaceSign;
    throwIfNotChar(spaceSign);

    const spaceLength = options.spaceLength ?? defaultOptions.spaceLength;
    throwIfLess(spaceLength, 0);
    throwIfNotInteger(spaceLength);
    const space = spaceSign.repeat(spaceLength);

    const heightStep = options.heightStep ?? defaultOptions.heightStep;
    throwIfLess(heightStep, 0);
    throwIfNotInteger(heightStep);
    const topOffset = heightStep + 1;


    return node => {
        const field: string[][] = [];
        let top = 0;
        let depth = baseDepth;


        const writeHeader = (header: string, name: string): number => {
            const fullIndentLength = indentLength * depth;
            const namePart = name + space;
            const headerRow = Array<string>(fullIndentLength + namePart.length + header.length);
            field.push(headerRow);

            headerRow.fill(spaceSign, 0, fullIndentLength)
            let left = fullIndentLength;
            for (let i = 0; i < namePart.length; ++i, ++left) {
                headerRow[left] = namePart[i];
            }
            for (let i = 0; i < header.length; ++i, ++left) {
                headerRow[left] = header[i];
            }

            for (let i = 0; i < heightStep; ++i) {
                field.push(Array<string>(fullIndentLength + 1).fill(spaceSign));
            }

            return top++;
        }


        const writeHorizontalLine = (top: number): void => {
            const row = field[top * topOffset];
            const endLeft = indentLength * depth;
            const startLeft = endLeft - indentLength;
            row.fill(horizontalSign, startLeft, endLeft);
        }


        const writeVerticalLine = (headerTop: number, endTop: number): void => {
            const left = indentLength * (depth - 1);
            headerTop *= topOffset
            endTop *= topOffset;
            for (let i = endTop; i > headerTop; --i) {
                field[i][left] = verticalSign;
            }
        }


        const writeChild = (child: Node, name: string): number => {
            const childTop = top;
            write(child, name);
            writeHorizontalLine(childTop);
            return childTop;
        }


        const writeParameters = (parameters: readonly Node[]): number => {
            if (parameters.length === 0) {
                return top;
            }

            if (parameters.length === 1) {
                return writeChild(parameters[0], "Parameter");
            }

            for (let i = 0; i < parameters.length - 1; ++i) {
                writeChild(parameters[i], `Parameter№${i + 1}`);
            }
            return writeChild(parameters.at(-1)!, `Parameter№${parameters.length}`);
        }


        const writeGenerator = (generator: ValueGenerator<unknown>): number => {
            const generatorTop = top;
            writeHeader(generator.constructor.name, "Generator");
            writeHorizontalLine(generatorTop);
            return generatorTop;
        }


        const writeTemplateHeader = (template: Template, name: string): number => {
            const templateName = template.identifier === undefined
                ? template.constructor.name
                : `${template.constructor.name} ${template.identifier}`;
            return writeHeader(templateName, name);
        }


        const defaultWriteTemplate = (template: Template & { generator: ValueGenerator<unknown> }, name: string): void => {
            const headerTop = writeTemplateHeader(template, name);
            ++depth;
            const generatorTop = writeGenerator(template.generator);
            writeVerticalLine(headerTop, generatorTop);
            --depth;
        }


        const write = (node: Node, name: string): void => {
            if (node instanceof NamedConstant) {
                writeHeader(node.constructor.name + space + node.name, name);
            }
            else if (node instanceof Constant) {
                writeHeader(node.constructor.name + space + node.value.toString(), name);
            }
            else if (node instanceof Variable) {
                writeHeader(node.constructor.name + space + node.name, name);
            }

            else if (node instanceof UnaryOperator) {
                const sign = getUnaryOperatorSign(node);
                const headerTop = writeHeader(node.constructor.name + space + sign, name);
                ++depth;
                const operandTop = writeChild(node.operand, "Operand");
                writeVerticalLine(headerTop, operandTop);
                --depth;
            }

            else if (node instanceof BinaryOperator) {
                const sign = getBinaryOperatorSign(node);
                const headerTop = writeHeader(node.constructor.name + space + sign, name);
                ++depth;
                writeChild(node.firstOperand, "FirstOperand");
                const secondOperandTop = writeChild(node.secondOperand, "SecondOperand");
                writeVerticalLine(headerTop, secondOperandTop);
                --depth;
            }

            else if (node instanceof Function) {
                const headerTop = writeHeader(node.constructor.name + space, name);
                ++depth;
                const lastParameterTop = writeParameters(node.parameters);
                if (lastParameterTop !== top) {
                    writeVerticalLine(headerTop, lastParameterTop);
                }
                --depth;
            }

            else if (node instanceof NamedConstantTemplate) {
                defaultWriteTemplate(node, name);
            }
            else if (node instanceof ConstantTemplate) {
                defaultWriteTemplate(node, name);
            }
            else if (node instanceof VariableTemplate) {
                defaultWriteTemplate(node, name);
            }

            else if (node instanceof UnaryOperatorTemplate) {
                const headerTop = writeTemplateHeader(node, name);
                ++depth;
                writeGenerator(node.generator);
                const operandTop = writeChild(node.operand, "Operand");
                writeVerticalLine(headerTop, operandTop);
                --depth;
            }

            else if (node instanceof BinaryOperatorTemplate) {
                const headerTop = writeTemplateHeader(node, name);
                ++depth;
                writeGenerator(node.generator);
                writeChild(node.firstOperand, "FirstOperand");
                const secondOperandTop = writeChild(node.secondOperand, "SecondOperand");
                writeVerticalLine(headerTop, secondOperandTop);
                --depth;
            }

            else if (node instanceof FunctionTemplate) {
                const headerTop = writeTemplateHeader(node, name);
                ++depth;
                writeGenerator(node.generator);
                const lastParameterTop = writeParameters(node.parameters);
                if (lastParameterTop !== top) {
                    writeVerticalLine(headerTop, lastParameterTop);
                }
                --depth;
            }

            else {
                throwNotSupported(node);
            }
        }


        write(node, "");
        field[0].splice(0, space.length); // First row is `${space}...`, because name is "".
        return field.map(r => r.join("")).join(newLine);
    }
}


const defaultTreeWrite = getTreeWriter({});


export { getTreeWriter, defaultTreeWrite };

