import { UniformGenerator } from "@/generators";
import { RootNode } from "@/nodes";
import { defaultParse } from "@/parse";
import { defaultLatexWrite } from "@/write";
import { readFile, writeFile } from "fs/promises";
import { stdin, stdout } from "process";
import { createInterface } from "readline/promises";
import { generate } from "./generate";
import { settingTemplateNode } from "./setting";


interface Config {
    pathToDocumentPattern: string;
    expressionPattern: string;
    outPath: string;
    numberExpressions: number;
    expressionTemplates: string[];
}


function throwIfPropertyNotExist<TKey extends string>(config: object, key: TKey): asserts config is { [_ in TKey]: unknown } {
    if (key in config) {
        return;
    }
    throw new Error(`The config must contain the '${key}' property.`);
}


const typeofTypes = typeof null;
type TypeofTypes = typeof typeofTypes;
interface TypeofMap {
    string: string;
    number: number;
    bigint: bigint;
    boolean: boolean;
    symbol: symbol;
    undefined: undefined;
    object: object;
    function: Function;
}

function throwIfInvalidType<
    TKey extends string,
    TType extends TypeofTypes | (abstract new (...args: any) => unknown)
>(config: { [_ in TKey]: unknown }, key: TKey, type: TType): asserts config is {
    [_ in TKey]:
    TType extends (abstract new (...args: any) => infer R) ? R :
    TType extends TypeofTypes ? TypeofMap[TType] :
    never
} {
    if (typeof type === "string") {
        if (typeof config[key] === type) {
            return;
        }
        throw new Error(`The config '${key}' property must be a '${type}'.`);
    }

    if (typeof type === "function") {
        if (config[key] instanceof type) {
            return;
        }
        throw new Error(`The config '${key}' property must be a '${type.name}'.`);
    }
}


function validateConfig(config: unknown): asserts config is Config {
    if (typeof config !== "object" || config === null) {
        throw new Error("The config must be an object.");
    }

    throwIfPropertyNotExist(config, "pathToDocumentPattern");
    throwIfInvalidType(config, "pathToDocumentPattern", "string");
    throwIfPropertyNotExist(config, "expressionPattern");
    throwIfInvalidType(config, "expressionPattern", "string");
    throwIfPropertyNotExist(config, "outPath");
    throwIfInvalidType(config, "outPath", "string");
    throwIfPropertyNotExist(config, "numberExpressions");
    throwIfInvalidType(config, "numberExpressions", "number");
    throwIfPropertyNotExist(config, "expressionTemplates");
    throwIfInvalidType(config, "expressionTemplates", Array);

    for (const template of config.expressionTemplates) {
        if (typeof template !== "string") {
            throw new Error("Expression template must be a string.");
        }
    }
}


const start = async () => {
    const config = JSON.parse(await readFile("./creatorConfig.json", "utf8"))
    validateConfig(config);

    const templateNodesGenerator = new UniformGenerator(config.expressionTemplates.map(text => {
        const root = new RootNode(defaultParse(text));
        settingTemplateNode(root);
        return root.node;
    }));

    const lines = Array<string>(config.numberExpressions);
    let i = 0;
    for (const node of generate(templateNodesGenerator, config.numberExpressions)) {
        lines[i] = config.expressionPattern
            .replace(/__number__/g, (++i).toString())
            .replace(/__expression__/g, defaultLatexWrite(node));
    }
    const documentPattern = await readFile(config.pathToDocumentPattern, "utf-8");
    const document = documentPattern.replace(/__document__/g, lines.join("\n"));
    await writeFile(config.outPath, document);

    const interface_ = createInterface({ input: stdin, output: stdout });
    await interface_.question("Success! Press enter...");
    interface_.close();
}


export { start };

