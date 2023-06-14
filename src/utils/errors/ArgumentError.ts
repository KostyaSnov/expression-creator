class ArgumentError extends Error {
    public readonly fields: readonly string[];


    public constructor(message: string, fields: string | readonly string[]) {
        super(message);
        this.fields = typeof fields === "string"
            ? [fields]
            : fields;
    }
}


export { ArgumentError };

