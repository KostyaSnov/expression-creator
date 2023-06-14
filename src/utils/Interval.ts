class Interval {
    public constructor(
        public readonly start: number,
        public readonly end: number
    ) {
        if (start >= end) {
            throw Error(`The start ${start} must be smaller than the end ${end}.`);
        }
    }


    public get length(): number {
        return this.end - this.start;
    }


    public toString(): string {
        return `${this.start}:${this.end}`;
    }
}


export { Interval };

