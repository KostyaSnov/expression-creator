import { Interval } from "@/utils/Interval";


class ParsingError extends Error {
    public readonly errorPart: string;


    public constructor(
        message: string,
        public readonly text: string,
        public readonly interval: Interval
    ) {
        super(message);
        this.errorPart = text.slice(interval.start, interval.end);
    }
}


export { ParsingError };

