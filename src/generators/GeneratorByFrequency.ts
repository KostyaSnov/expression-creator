import { ArgumentError } from "@/utils/errors";
import { sum } from "@/utils/iterable";
import assert from "assert";
import { ValueGeneratorBase } from "./ValueGeneratorBase";


class GeneratorByFrequency<T> extends ValueGeneratorBase<T> {
    private readonly distribution: Iterable<readonly [probability: number, value: T]>;


    public constructor(distribution: Iterable<readonly [frequency: number, value: T]>) {
        super();

        const frequencySum = sum(distribution, ([frequency]) => {
            if (frequency > 0) {
                return frequency;
            }
            throw new ArgumentError("Frequency must be greater than zero.", "frequency");
        });
        if (frequencySum === 0) {
            throw new ArgumentError("Distribution must contain at least one element.", "distribution");
        }

        let probability = 0;
        const probabilityDistribution: [number, T][] = [];
        for (const [frequency, value] of distribution) {
            probability += frequency / frequencySum;
            probabilityDistribution.push([probability, value]);
        }
        this.distribution = probabilityDistribution;
    }


    protected override generateOne(): T {
        const randomProbability = Math.random();
        for (const [probability, value] of this.distribution) {
            if (randomProbability <= probability) {
                return value;
            }
        }
        assert(false); // Unreachable code.
    }
}


export { GeneratorByFrequency };

