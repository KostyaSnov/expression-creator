import { ValueGenerator } from "@/generators";
import {
    Addition, Constant, Division, Minus, Multiplication, NamedConstant,
    Node, Plus, Power, Root, RootNode, SquareRoot, Subtraction
} from "@/nodes";
import { define } from "@/templates";


function* generate(generator: ValueGenerator<Node>, number: number): Generator<Node, void, undefined> {
    let i = 0;
    while (i < number) {
        const root = new RootNode(generator.generate().copy());
        define(root);
        if (transform(root)) {
            if (root.node instanceof Constant) {
                continue;
            }
            yield root.node;
            ++i;
        }
    }
}


const transform = (root: RootNode): boolean => {
    let isTransformed = true;
    while (isTransformed) {
        for (const proxyChild of root.postOrderProxyVisit()) {
            const node = oneTransform(proxyChild.node);
            if (node === undefined) {
                return false;
            }
            isTransformed &&= proxyChild.node !== node;
            proxyChild.node = node;
        }
    }
    return true;
}


const tryGetConstantValue = (node: Node): number | void => {
    if (node instanceof Constant && !(node instanceof NamedConstant)) {
        return node.value;
    }
}


const oneTransform = (node: Node): Node | void => {
    if (node instanceof Plus) {
        return node.operand;
    }

    else if (node instanceof Minus) {
        if (node.operand instanceof Minus) {
            return node.operand.operand;
        }

        const operandValue = tryGetConstantValue(node.operand);
        if (operandValue !== undefined) {
            return new Constant(-operandValue);
        }
    }

    else if (node instanceof SquareRoot) {
        const operandValue = tryGetConstantValue(node.operand);
        if (operandValue !== undefined && operandValue < 0) {
            return;
        }
    }

    else if (node instanceof Addition) {
        const firstAddendValue = tryGetConstantValue(node.firstAddend);
        const secondAddendValue = tryGetConstantValue(node.secondAddend);
        if (firstAddendValue !== undefined) {
            if (secondAddendValue !== undefined) {
                return new Constant(firstAddendValue + secondAddendValue);
            }
            if (firstAddendValue === 0) {
                return node.secondAddend;
            }
        }
        if (secondAddendValue === 0) {
            return node.firstAddend;
        }
        if (secondAddendValue !== undefined && secondAddendValue < 0) {
            return new Subtraction(node.firstAddend, new Constant(-secondAddendValue));
        }

        if (node.secondAddend instanceof Minus) {
            return new Subtraction(node.firstAddend, node.secondAddend);
        }

        return node;
    }

    else if (node instanceof Subtraction) {
        const minuendValue = tryGetConstantValue(node.minuend);
        const subtrahendValue = tryGetConstantValue(node.subtrahend);

        if (minuendValue !== undefined) {
            if (subtrahendValue !== undefined) {
                return new Constant(minuendValue - subtrahendValue);
            }
            if (minuendValue === 0) {
                return new Minus(node.subtrahend);
            }
        }
        if (subtrahendValue === 0) {
            return node.minuend;
        }
        if (subtrahendValue !== undefined && subtrahendValue < 0) {
            return new Addition(node.minuend, new Constant(-subtrahendValue));
        }

        if (node.subtrahend instanceof Minus) {
            return new Addition(node.minuend, node.subtrahend);
        }
    }

    else if (node instanceof Multiplication) {
        const firstFactorValue = tryGetConstantValue(node.firstFactor);
        if (firstFactorValue === 0) {
            return new Constant(0);
        }
        if (firstFactorValue === 1) {
            return node.secondFactor;
        }
        const secondFactorValue = tryGetConstantValue(node.secondFactor);
        if (secondFactorValue === 0) {
            return new Constant(0);
        }
        if (secondFactorValue === 1) {
            return node.firstFactor;
        }
        if (firstFactorValue !== undefined && secondFactorValue !== undefined) {
            return new Constant(firstFactorValue * secondFactorValue);
        }
        if (firstFactorValue === -1) {
            return new Minus(node.secondFactor);
        }
        if (secondFactorValue === -1) {
            return new Minus(node.firstFactor);
        }
    }

    else if (node instanceof Division) {
        const divisorValue = tryGetConstantValue(node.divisor);
        if (divisorValue === 0) {
            return;
        }
        if (divisorValue === 1) {
            return node.firstOperand;
        }
        const dividendValue = tryGetConstantValue(node.dividend);
        if (dividendValue === 0) {
            return new Constant(0);
        }
        if (divisorValue !== undefined && dividendValue !== undefined) {
            return new Constant(dividendValue / divisorValue);
        }
        if (divisorValue === -1) {
            return new Minus(node.firstOperand);
        }
    }

    else if (node instanceof Power) {
        const baseValue = tryGetConstantValue(node.base);
        if (baseValue === 0 || baseValue === 1) {
            return new Constant(baseValue);
        }
        const exponentValue = tryGetConstantValue(node.exponent);
        if (baseValue !== undefined) {
            if (baseValue < 0) {
                return;
            }
            if (exponentValue !== undefined) {
                return new Constant(baseValue ** exponentValue);
            }
        }
        if (exponentValue === 0) {
            return new Constant(1);
        }
        if (exponentValue === 1) {
            return node.base;
        }
    }

    else if (node instanceof Root) {
        const radicandValue = tryGetConstantValue(node.radicand);
        if (radicandValue === 0 || radicandValue === 1) {
            return new Constant(radicandValue);
        }
        const degreeValue = tryGetConstantValue(node.degree);
        if (radicandValue !== undefined) {
            if (radicandValue < 0) {
                return;
            }
            if (degreeValue !== undefined) {
                if (degreeValue <= 0) {
                    return;
                }
                return new Constant(radicandValue ** (1 / degreeValue));
            }
        }
        if (degreeValue === 1) {
            return node.radicand;
        }
        if (degreeValue === 2) {
            return new SquareRoot(node.radicand);
        }
        if (degreeValue !== undefined && degreeValue <= 0) {
            return;
        }
    }

    return node;
}


export { generate };

