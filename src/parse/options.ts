import { SingleGenerator, ValueGenerator } from "@/generators";
import {
    Addition, BinaryOperator, Constant, Function, NamedConstant, NaturalLogarithm, Node,
    PI, Plus, UnaryOperator, Variable
} from "@/nodes";
import { constructorToArray, constructorToSpread } from "@/utils/args";
import { FunctionCreator } from "./parseSetting";


interface ParsingOptionsBase {
    additionalNamedConstants: Readonly<Partial<Record<string, NamedConstant>>>;
    additionalFunctionCreators: Readonly<Partial<Record<string, FunctionCreator>>>;
    defaultNamedConstantGenerator: ValueGenerator<NamedConstant>;
    defaultConstantGenerator: ValueGenerator<Constant>;
    defaultVariableGenerator: ValueGenerator<Variable>;
    defaultUnaryOperatorGenerator: ValueGenerator<(operand: Node) => UnaryOperator>;
    defaultBinaryOperatorGenerator: ValueGenerator<(firstOperand: Node, secondOperand: Node) => BinaryOperator>;
    defaultFunctionGenerator: ValueGenerator<(parameters: Node[]) => Function>;
}


type ParsingOptions = {
    readonly [K in keyof ParsingOptionsBase]?: ParsingOptionsBase[K];
}


type RequiredOptions = {
    readonly [K in keyof ParsingOptionsBase]: ParsingOptionsBase[K];
}


const defaultOptions: RequiredOptions = {
    additionalNamedConstants: {},
    additionalFunctionCreators: {},
    defaultNamedConstantGenerator: new SingleGenerator(PI),
    defaultConstantGenerator: new SingleGenerator(new Constant(0)),
    defaultVariableGenerator: new SingleGenerator(new Variable("a")),
    defaultUnaryOperatorGenerator: new SingleGenerator(constructorToSpread(Plus)),
    defaultBinaryOperatorGenerator: new SingleGenerator(constructorToSpread(Addition)),
    defaultFunctionGenerator: new SingleGenerator(constructorToArray<Node[], NaturalLogarithm>(NaturalLogarithm, 1)),
};


export { ParsingOptions, defaultOptions };

