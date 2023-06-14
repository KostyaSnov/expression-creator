import {
    Addition, Arccosecant, Arccosine, Arccotangent, Arcosecant, Arcosine, Arcotangent, Arcsecant, Arcsine,
    Arctangent, Arsecant, Arsine, Artangent, BinaryOperator, CommonLogarithm, Cosecant, Cosine, Cotangent,
    Division, Function, HyperbolicCosecant, HyperbolicCosine, HyperbolicCotangent, HyperbolicSecant,
    HyperbolicSine, HyperbolicTangent, Logarithm, Minus, Multiplication, NaturalLogarithm, Node, Plus,
    Power, Root, Secant, Sign, Sine, SquareRoot, Subtraction, Tangent, UnaryOperator
} from "@/nodes";
import {
    BinaryOperatorTemplate, ConstantTemplate, FunctionTemplate, NamedConstantTemplate,
    Template, UnaryOperatorTemplate, VariableTemplate
} from "@/templates";
import { InstanceofMap } from "@/utils/instanceofMap";
import { throwNotSupported } from "./throwNotSupported";


type NodeConstructor<T extends Node> = abstract new (...args: any) => T;


const unaryOperatorNames = new InstanceofMap(new Map<NodeConstructor<UnaryOperator>, string>([
    [Plus, "+"],
    [Minus, "-"],
    [SquareRoot, "√"]
]));

const getUnaryOperatorSign = (unaryOperator: UnaryOperator): string => unaryOperatorNames.get(unaryOperator) ?? throwNotSupported(unaryOperator);


const binaryOperatorNames = new InstanceofMap(new Map<NodeConstructor<BinaryOperator>, string>([
    [Addition, "+"],
    [Subtraction, "-"],
    [Multiplication, "*"],
    [Division, "/"],
    [Power, "^"],
    [Root, "√"]
]));

const getBinaryOperatorSign = (binaryOperator: BinaryOperator): string => binaryOperatorNames.get(binaryOperator) ?? throwNotSupported(binaryOperator);


const functionNames = new InstanceofMap(new Map<NodeConstructor<Function>, string>([
    [Logarithm, "log"],
    [CommonLogarithm, "lg"],
    [NaturalLogarithm, "ln"],
    [Sine, "sin"],
    [Cosine, "cos"],
    [Tangent, "tg"],
    [Secant, "sec"],
    [Cosecant, "cosec"],
    [Cotangent, "ctg"],
    [Arcsine, "arcsin"],
    [Arccosine, "arccos"],
    [Arcsecant, "arcsec"],
    [Arccosecant, "arccosec"],
    [Arctangent, "arctg"],
    [Arccotangent, "arcctg"],
    [HyperbolicSine, "sh"],
    [HyperbolicCosine, "ch"],
    [HyperbolicSecant, "sch"],
    [HyperbolicCosecant, "csch"],
    [HyperbolicTangent, "th"],
    [HyperbolicCotangent, "cth"],
    [Arsine, "arsh"],
    [Arcosine, "arch"],
    [Arsecant, "arsch"],
    [Arcosecant, "arcsch"],
    [Artangent, "arth"],
    [Arcotangent, "arcth"],
    [Sign, "sign"]
]));

const getFunctionName = (function_: Function): string => functionNames.get(function_) ?? throwNotSupported(function_);


const templateNames = new InstanceofMap(new Map<NodeConstructor<Template>, string>([
    [ConstantTemplate, "CT"],
    [NamedConstantTemplate, "NCT"],
    [VariableTemplate, "VT"],
    [UnaryOperatorTemplate, "UT"],
    [BinaryOperatorTemplate, "BT"],
    [FunctionTemplate, "FT"]
]));

const getTemplateName = (template: Template): string => templateNames.get(template) ?? throwNotSupported(template);


export { getBinaryOperatorSign, getFunctionName, getTemplateName, getUnaryOperatorSign };

