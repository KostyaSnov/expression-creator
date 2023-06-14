interface TreeWritingOptionsBase {
    indentLength: number;
    baseDepth: number;
    newLine: string;
    horizontalSign: string;
    verticalSign: string;
    spaceSign: string;
    spaceLength: number;
    heightStep: number;
}


type TreeWritingOptions = {
    readonly [K in keyof TreeWritingOptionsBase]?: TreeWritingOptionsBase[K];
};


type RequiredOptions = {
    readonly [K in keyof TreeWritingOptionsBase]: TreeWritingOptionsBase[K];
};


const defaultOptions: RequiredOptions = {
    indentLength: 4,
    baseDepth: 0,
    newLine: "\n",
    horizontalSign: "—",
    verticalSign: "|",
    spaceSign: " ",
    spaceLength: 1,
    heightStep: 0
}


export { TreeWritingOptions, defaultOptions };

