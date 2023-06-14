import { Node } from "@/nodes";
import { TestResult, Tester } from "./Tester";


class СoncatenatedTester implements Tester {
    public constructor(private readonly testers: Iterable<Tester>) { }


    public *test(node: Node): Generator<TestResult, void, undefined> {
        for (const tester of this.testers) {
            yield* tester.test(node);
        }
    }
}


export { СoncatenatedTester };

