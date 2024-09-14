import {
    CyclicGenerator, GeneratorByFrequency, GeneratorWrapper, RoundNumberGenerator,
    SingleGenerator, UniformGenerator, UniformСontinuousNumberGenerator,
    ValueGenerator
} from "@/generators";
import {
    Addition, Arccosecant, Arccosine, Arccotangent, Arcosecant, Arcosine,
    Arcotangent, Arcsecant, Arcsine, Arctangent, Arsecant, Arsine,
    Artangent, BinaryOperator, Ceil, CommonLogarithm, Constant, Cosecant,
    Cosine, Cotangent, Division, E, Floor, FractionalPart,
    Function, HyperbolicCosecant, HyperbolicCosine, HyperbolicCotangent,
    HyperbolicSecant, HyperbolicSine, HyperbolicTangent, Logarithm,
    Minus, Modulus, Multiplication, NaturalLogarithm,
    Node, PI, Power, Root, RootNode, Secant, Sign, Sine, SquareRoot,
    Subtraction, Tangent, UnaryOperator, Variable,
} from "@/nodes";
import {
    BinaryOperatorTemplate, ConstantTemplate, FunctionTemplate,
    UnaryOperatorTemplate, VariableTemplate
} from "@/templates";
import { Interval } from "@/utils/Interval";
import { constructorToArray, constructorToSpread } from "@/utils/args";


const unaryOperatorCreatorsGenerator = new UniformGenerator(
    [Minus, SquareRoot].map(c => constructorToSpread<[operand: Node], UnaryOperator>(c))
);


const binaryOperatorCreatorGenerator = new UniformGenerator(
    [
        Addition, Subtraction, Multiplication, Division, Power, Root
    ].map(c => constructorToSpread<[firstOperand: Node, secondOperand: Node], BinaryOperator>(c))
);


const functionCreatorsGenerators: Readonly<Partial<Record<number, ValueGenerator<(parameters: Node[]) => Function>>>> = {
    1: new UniformGenerator(
        [
            CommonLogarithm, NaturalLogarithm, Ceil, Floor, Modulus, FractionalPart,
            Sign, Sine, Cosine, Secant, Cosecant, Tangent, Cotangent, Arcsine,
            Arccosine, Arcsecant, Arccosecant, Arctangent, Arccotangent,
            HyperbolicSine, HyperbolicCosine, HyperbolicSecant, HyperbolicCosecant,
            HyperbolicTangent, HyperbolicCotangent, Arsine, Arcosine, Arsecant,
            Arcosecant, Artangent, Arcotangent,
        ].map(c => constructorToArray<Node[], Function>(c))
    ),
    2: new UniformGenerator([Logarithm].map(c => constructorToArray<Node[], Function>(c))),
};


const dummyVariable = new Variable("dummy");
const aVariable = new Variable("a");
const bVariable = new Variable("b");
const cVariable = new Variable("c");
const dVariable = new Variable("d");
const variablesGenerators: Readonly<Partial<Record<number, ValueGenerator<Variable>>>> = {
    0: new SingleGenerator(dummyVariable),
    1: new SingleGenerator(aVariable),
    2: new CyclicGenerator([aVariable, bVariable]),
    3: new CyclicGenerator([aVariable, bVariable, cVariable]),
    4: new CyclicGenerator([aVariable, bVariable, cVariable, dVariable]),
};


const constantsGenerator = new GeneratorWrapper(
    new GeneratorByFrequency<ValueGenerator<Constant>>([
        [1, new UniformGenerator([E, PI])],
        [5, new GeneratorWrapper(
            new RoundNumberGenerator(
                new UniformСontinuousNumberGenerator(new Interval(-10, 10)),
                0
            ),
            value => new Constant(value)
        )]
    ]),
    generator => generator.generate()
);


const settingTemplateNode = (root: RootNode): void => {
    let numberVariableTemplates = 0;
    for (const child of root.node.postOrderVisit()) {
        if (child instanceof VariableTemplate) {
            ++numberVariableTemplates;
        }
    }
    const variablesGenerator = variablesGenerators[numberVariableTemplates];
    if (variablesGenerator === undefined) {
        throw new Error("Unexpected number of variable templates.");
    }

    for (const proxyChild of root.postOrderProxyVisit()) {
        const node = proxyChild.node;

        if (node instanceof VariableTemplate) {
            proxyChild.node = new VariableTemplate(variablesGenerator, node.identifier);

        } else if (node instanceof ConstantTemplate) {
            proxyChild.node = new ConstantTemplate(constantsGenerator, node.identifier);

        } else if (node instanceof UnaryOperatorTemplate) {
            proxyChild.node = new UnaryOperatorTemplate(
                node.operand,
                unaryOperatorCreatorsGenerator,
                node.identifier
            );

        } else if (node instanceof BinaryOperatorTemplate) {
            proxyChild.node = new BinaryOperatorTemplate(
                node.firstOperand,
                node.secondOperand,
                binaryOperatorCreatorGenerator,
                node.identifier
            );

        } else if (node instanceof FunctionTemplate) {
            const functionCreatorsGenerator = functionCreatorsGenerators[node.parameters.length];
            if (functionCreatorsGenerator === undefined) {
                throw new Error("Unexpected number of function template parameters.");
            }
            proxyChild.node = new FunctionTemplate(
                node.parameters,
                functionCreatorsGenerator,
                node.identifier
            );
        }
    }
};


export { settingTemplateNode };

