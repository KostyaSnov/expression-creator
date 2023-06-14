import { Interval } from "@/utils/Interval";
import { ArgumentError } from "@/utils/errors";
import { sum } from "@/utils/iterable";
import assert from "assert";
import { ValueGeneratorBase } from "./ValueGeneratorBase";


class UniformСontinuousNumberGenerator extends ValueGeneratorBase<number> {
    private readonly distribution: Iterable<readonly [probability: number, interval: Interval]>;


    public constructor(intervals: Interval | Iterable<Interval>) {
        super();

        if (intervals instanceof Interval) {
            intervals = [intervals];
        }

        const lengthSum = sum(intervals, r => r.length);
        if (lengthSum === 0) {
            throw new ArgumentError("Intervals must contain at least one element.", "intervals");
        }

        let probability = 0;
        const distribution: [number, Interval][] = [];
        for (const interval of intervals) {
            probability += interval.length / lengthSum;
            distribution.push([probability, interval]);
        }
        this.distribution = distribution;
    }


    protected override generateOne(): number {
        const randomProbability = Math.random();
        let previousProbability = 0;
        for (const [probability, interval] of this.distribution) {
            if (randomProbability <= probability) {
                const coefficient = (randomProbability - previousProbability) / (probability - previousProbability);
                return interval.start + coefficient * interval.length;
            }
            previousProbability = probability;
        }
        assert(false); // Unreachable code.
    }
}


export { UniformСontinuousNumberGenerator };

