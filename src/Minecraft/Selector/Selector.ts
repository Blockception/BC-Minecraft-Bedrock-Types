import { Modes } from "../../Modes/Modes";
import { SelectorItemAttribute } from "./ItemAttribute";
import { SelectorScoreAttribute } from "./ScoreAttribute";
import { SelectorValueAttribute } from "./ValueAttribute";

export type SelectorAttribute =
  | SelectorValueAttribute
  | SelectorScoreAttribute
  | SelectorItemAttribute;

/**An object that represents a selector*/
export class Selector {
  /**The offset in the document where this selector starts*/
  public offset: number;
  /**The selector type such as @a | @e*/
  public type: string;
  /**The attribute assigned to the selector*/
  public attributes: SelectorAttribute[];

  /**Creates a new instance of a selector
   * @param type The type of the selector such as @a | @e
   * @param offset The offset the selector starts in the document*/
  constructor(type: string, offset: number = 0) {
    this.type = type;
    this.offset = offset;
    this.attributes = [];
  }

  /**TODO add documentation
   *
   * @returns
   */
  toString(): string {
    if (this.attributes.length=== 0) {
      return this.type;
    }

    return `${this.type}[${this.attributes.map((attribute) => attribute.toString()).join(",")}]`;
  }

  /**TODO add documentation
   *
   * @param parameter
   * @returns
   */
  contains(parameter: string): boolean {
    return (
      this.attributes.findIndex((attribute) => attribute.name === parameter) !==
      -1
    );
  }

  /**TODO add documentation
   *
   * @param parameter
   * @returns
   */
  count(parameter: string): number {
    return this.get(parameter).length;
  }

  /**TODO add documentation
   *
   * @param parameter
   * @returns
   */
  get(parameter: string): SelectorAttribute[] {
    return this.attributes.filter((attribute) => attribute.name === parameter);
  }

  /**TODO add documentation
   *
   * @param cursor
   * @returns
   */
  isInScore(cursor: number): boolean {
    return this.attributes.findIndex((attribute) => attribute.name === "scores" && attribute.isCursorHere(cursor)) !== -1;
  }
}

/**TODO add documentation
 *
 */
export namespace Selector {
  /**TODO add documentation
   *
   * @param type
   * @returns
   */
  export function isValidType(type: string | Selector): boolean {
    if (typeof type !== "string") {
      type = type.type;
    }

    return Modes.SelectorType.isValue(type);
  }

  /**TODO add documentation
   *
   * @param text
   * @returns
   */
  export function getType(text: string): string {
    let index = text.indexOf("[");
    if (index < 0) index = text.length;

    return text.substring(0, index);
  }

  /**TODO add documentation
   *
   * @param text
   * @param offset
   * @returns
   */
  export function parse(text: string, offset: number = 0): Selector {
    const type = getType(text);
    const Out = new Selector(type, offset);

    //remove prefix
    if (type.length >= text.length) return Out;

    const data = text.substring(type.length, text.length);
    offset += type.length;

    if (data.startsWith("[") && data.endsWith("]")) {
      SelectorAttribute.parseParameters(
        data.substring(1, data.length - 1),
        offset + 1,
        Out,
        Out.attributes
      );
    }

    return Out;
  }

  export function isSelector(
    value: string,
    wildcard: boolean = false,
    allowFakePlayers: boolean = false
  ): boolean {
    if (value.startsWith("@")) return true;

    if (wildcard === true) {
      if (value === "*") return true;
    }

    if (allowFakePlayers === true) {
      if (value.startsWith('"') && value.endsWith('"')) return true;

      if (value.includes(" ")) {
        return false;
      }

      return true;
    }

    return false;
  }

  export function getAttribute(attribute: string, selector: string): string[] {
    const regex = new RegExp(`${attribute}=([^\,\]]+)`, "gim");
    const matches = regex.exec(selector);

    if (matches) {
      return matches;
    }

    return [];
  }
}

/**TODO add documentation
 *
 */
export namespace SelectorAttribute {
  /**TODO add documentation
   *
   * @param text
   * @param offset
   * @param selector
   * @param receiver
   */
  export function parseParameters(
    text: string,
    offset: number,
    selector: Selector,
    receiver: SelectorAttribute[]
  ): void {
    let start: number = 0;
    let level: number = 0;

    for (let index = 0; index < text.length; index++) {
      const char = text[index];

      switch (char) {
        case "{":
          level++;
          break;
        case "}":
          level--;
          break;

        case ",":
          if (level == 0) {
            const p = text.substring(start, index);
            SelectorAttribute.parse(p, offset + start, receiver);
            start = index + 1;
          }

        default:
          continue;
      }
    }

    if (start < text.length) {
      const p = text.substring(start, text.length);
      SelectorAttribute.parse(p, offset + start, receiver);
    }
  }

  /**TODO add documentation
   * @param text
   * @param offset
   * @param selector
   * @param receiver
   */
  export function parse(text: string,offset: number,receiver: SelectorAttribute[]): void {
    let Index = text.indexOf("=");

    if (Index < 0) throw new Error("index cannot be lower then 0");

    const name = text.substring(0, Index).trim();

    switch (name) {
      case "scores":
        receiver.push(SelectorScoreAttribute.parse(text, offset));
        break;

      case "hasitem":
        receiver.push(SelectorItemAttribute.parse(text, offset));
        break;

      default:
        Index = Index + 1;
        const value = text.substring(Index, text.length);
        receiver.push(new SelectorValueAttribute(name, value, offset));
        break;
    }
  }

  export function is(value: any): value is SelectorAttribute {
    if (typeof value === "object") {
      if (typeof value.offset !== "number") return false;
      if (typeof value.name !== "string") return false;
      if (typeof value.value !== "string") return false;

      return true;
    }

    return false;
  }
}
