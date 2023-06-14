import { Node } from "@/nodes";


interface TestResult {
    identifier: string;
    expected: number;
    received: number;
    coincide: boolean;
}


interface Tester {
    test(node: Node): Iterable<TestResult>;
}


export { TestResult, Tester };

