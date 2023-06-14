import { Node } from "@/nodes";
import { TestResult, Tester } from "./Tester";


interface TestCase {
    readonly identifier?: string;
    readonly expected: number;
    evaluate(node: Node): number;
}


abstract class TesterBase implements Tester {
    protected abstract readonly cases: Iterable<TestCase>;


    public constructor(public readonly epsilon: number) { }


    public *test(node: Node): Generator<TestResult, void, undefined> {
        let i = 0;
        for (const case_ of this.cases) {
            const received = case_.evaluate(node);
            const coincide = Math.abs(received - case_.expected) <= this.epsilon;
            yield {
                identifier: case_.identifier ?? i.toString(),
                expected: case_.expected,
                received,
                coincide
            };
            ++i;
        }
    }
}


export { TesterBase, TestCase };

