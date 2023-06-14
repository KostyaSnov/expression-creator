import { Constant, Node, RootNode, Variable } from "@/nodes";
import { TestCase, TesterBase } from "./TesterBase";


interface SubstitutionsTestCase {
    readonly identifier?: string;
    readonly substitutions: Iterable<readonly [name: string, value: number]>;
    readonly expected: number;
}


class SubstitutionsTester extends TesterBase {
    public readonly cases: readonly TestCase[];


    public constructor(cases: Iterable<SubstitutionsTestCase>, epsilon = 10e-6) {
        super(epsilon);

        const testCases: TestCase[] = [];
        for (const case_ of cases) {
            const substitutions = new Map<string, Constant>();
            for (const [name, value] of case_.substitutions) {
                substitutions.set(name, new Constant(value));
            }
            testCases.push(new TestCaseWithSubstitutions(case_.expected, substitutions, case_.identifier));
        }
        this.cases = testCases;
    }
}


class TestCaseWithSubstitutions implements TestCase {
    public readonly identifier?: string;


    public constructor(
        public readonly expected: number,
        private readonly substitutions: ReadonlyMap<string, Constant>,
        identifier?: string,
    ) {
        if (identifier !== undefined) {
            this.identifier = identifier;
        }
    }


    public evaluate(node: Node): number {
        const root = new RootNode(node.copy());

        for (const proxyChild of root.postOrderProxyVisit()) {
            if (!(proxyChild.node instanceof Variable)) {
                continue;
            }
            const constant = this.substitutions.get(proxyChild.node.name);
            if (constant !== undefined) {
                proxyChild.node = constant;
            }
        }

        return root.node.evaluate();
    }
}


export { SubstitutionsTester, SubstitutionsTestCase };

