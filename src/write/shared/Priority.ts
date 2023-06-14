import {
    Addition, Ceil, Division, Floor, FractionalPart, Function, Minus, Modulus, Multiplication,
    Node, Plus, Power, Primary, Root, SquareRoot, Subtraction
} from "@/nodes";
import { BinaryOperatorTemplate, FunctionTemplate, PrimaryTemplate, UnaryOperatorTemplate } from "@/templates";
import { InstanceofMap } from "@/utils/instanceofMap";
import { throwNotSupported } from "./throwNotSupported";


const enum Priority {
    Lowest,
    BinaryAdditive,
    BinaryMultiplicative,
    UnaryMultiplicate,
    BinaryExponential,
    UnaryExponential,
    BinaryTemplate,
    UnaryTemplate,
    Function,
    Primary
}

const priorities = new InstanceofMap(new Map<abstract new (...args: any) => Node, Priority>([
    [Addition, Priority.BinaryAdditive],
    [Subtraction, Priority.BinaryAdditive],
    [Multiplication, Priority.BinaryMultiplicative],
    [Division, Priority.BinaryMultiplicative],
    [Plus, Priority.UnaryMultiplicate],
    [Minus, Priority.UnaryMultiplicate],
    [Power, Priority.BinaryExponential],
    [Root, Priority.BinaryExponential],
    [SquareRoot, Priority.UnaryExponential],
    [BinaryOperatorTemplate, Priority.BinaryTemplate],
    [UnaryOperatorTemplate, Priority.UnaryTemplate],
    [Function, Priority.Function],
    [FunctionTemplate, Priority.Function],
    [Modulus, Priority.Primary],
    [Ceil, Priority.Primary],
    [Floor, Priority.Primary],
    [FractionalPart, Priority.Primary],
    [Primary, Priority.Primary],
    [PrimaryTemplate, Priority.Primary]
]));

const getPriority = (node: Node): Priority => priorities.get(node) ?? throwNotSupported(node);


const maxPriority = {
    plusOperand: Priority.UnaryMultiplicate,
    minusOperand: Priority.UnaryMultiplicate,
    squareRootOperand: Priority.UnaryExponential,
    unaryOperatorTemplateOperand: Priority.UnaryTemplate,

    additionFirstOperand: Priority.Lowest,
    subtractionFirstOperand: Priority.Lowest,
    multiplicationFirstOperand: Priority.BinaryAdditive,
    divisionFirstOperand: Priority.BinaryAdditive,
    powerFirstOperand: Priority.BinaryExponential,
    rootFirstOperand: Priority.BinaryExponential,
    binaryOperatorTemplateFirstOperand: Priority.BinaryTemplate,

    additionSecondOperand: Priority.Lowest,
    subtractionSecondOperand: Priority.BinaryAdditive,
    multiplicationSecondOperand: Priority.BinaryAdditive,
    divisionSecondOperand: Priority.BinaryMultiplicative,
    powerSecondOperand: Priority.BinaryMultiplicative,
    rootSecondOperand: Priority.BinaryMultiplicative,
    binaryOperatorTemplateSecondOperand: Priority.BinaryTemplate
} as const satisfies Record<string, Priority>;


export { Priority, getPriority, maxPriority };

