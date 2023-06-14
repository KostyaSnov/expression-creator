import { RawAngleBracketsSign } from "./options";


const angleBracketsSignNames = ["⟨⟩", "<>", "‹›"] as const satisfies Record<RawAngleBracketsSign, string>;


export { angleBracketsSignNames };

