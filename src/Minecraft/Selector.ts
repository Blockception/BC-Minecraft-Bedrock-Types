import { Modes } from "../Modes/Modes";
import { OffsetWord } from '../Types/OffsetWord';

/**An object that represents a selector*/
export class Selector {
  /**The offset in the document where this selector starts*/
  public offset: number;
  /**The selector type such as @a | @e*/
  public type: string;
  /**The attribute assigned to the selector*/
  public attributes: SelectorAttribute[];
  /**The scores assigned to the selector*/
  public scores: SelectorAttribute[];

  /**Creates a new instance of a selector
   * @param type The type of the selector such as @a | @e
   * @param offset The offset the selector starts in the document*/
  constructor(type: string, offset: number = 0) {
    this.type = type;
    this.offset = offset;
    this.attributes = [];
    this.scores = [];
  }

  /**TODO add documentation
   *
   * @returns
   */
  toString(): string {
    const attr = this.attributes.map((x) => x.toString()).join(",");
    const scores = this.scores.map((x) => x.toString()).join(",");

    let out = this.type;
    const hAttr = attr.length > 0;
    const hScores = attr.length > 0;

    if (hAttr || hScores) {
      out += "[";

      if (hAttr) out += attr;
      if (hAttr && hScores) {
        out += ",";
      }
      if (hScores) out += scores;

      out += "]";
    }

    return out;
  }

  /**TODO add documentation
   *
   * @param parameter
   * @returns
   */
  contains(parameter: string): boolean {
    if (parameter === "scores") return this.scores.length > 0;

    for (let index = 0; index < this.attributes.length; index++) {
      const element = this.attributes[index];
      if (element.name === parameter) return true;
    }

    return false;
  }

  /**TODO add documentation
   *
   * @param parameter
   * @returns
   */
  count(parameter: string): number {
    if (parameter === "scores") return this.scores.length > 0 ? 1 : 0;

    let Out = 0;
    for (let index = 0; index < this.attributes.length; index++) {
      const element = this.attributes[index];
      if (element.name === parameter) Out++;
    }

    return Out;
  }

  /**TODO add documentation
   *
   * @param parameter
   * @returns
   */
  get(parameter: string): SelectorAttribute[] {
    if (parameter === "scores") return this.scores;

    return this.attributes.filter((x) => x.name === parameter);
  }

  /**TODO add documentation
   *
   * @param cursor
   * @returns
   */
  isInScore(cursor: number): boolean {
    let max = Number.MIN_SAFE_INTEGER;
    let min = Number.MAX_SAFE_INTEGER;

    this.scores.forEach((s) => {
      max = Math.max(max, SelectorAttribute.getEndOffset(s));
      min = Math.min(min, s.offset);
    });

    //scores={ at start
    min -= 7;
    //} at the end
    max += 1;

    if (cursor >= min && cursor <= max) return true;

    return false;
  }
}

/**TODO add documentation
 *
 */
export class SelectorAttribute {
  /** */
  public offset: number;
  /** */
  public name: string;
  /** */
  public value: string;

  /**TODO add documentation
   *
   * @param name
   * @param value
   * @param offset
   */
  constructor(name: string, value: string, offset: number = 0) {
    this.name = name;
    this.value = value;
    this.offset = offset;
  }

  /**TODO add documentation
   *
   * @returns
   */
  toString(): string {
    return `${this.name}=${this.value}`;
  }

  getName(): OffsetWord {
    return { text: this.name, offset: this.offset };
  }

  getValue(): OffsetWord {
    return { text: this.value, offset: this.offset + this.name.length + 1 };
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
      SelectorAttribute.parseParameters(data.substring(1, data.length - 1), offset + 1, Out, Out.attributes);
    }

    return Out;
  }

  export function isSelector(value: string, wildcard: boolean = false, allowFakePlayers: boolean = false): boolean {
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
  export function parseParameters(text: string, offset: number, selector: Selector, receiver: SelectorAttribute[]): void {
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
            SelectorAttribute.parse(text.substring(start, index), offset + start, selector, receiver);
            start = index + 1;
          }

        default:
          continue;
      }
    }

    if (start < text.length) {
      SelectorAttribute.parse(text.substring(start, text.length), offset + start, selector, receiver);
    }
  }

  /**TODO add documentation
   *
   * @param text
   * @param offset
   * @param selector
   * @param receiver
   */
  export function parse(text: string, offset: number, selector: Selector, receiver: SelectorAttribute[]): void {
    let Index = text.indexOf("=");

    if (Index < 0) throw new Error("index cannot be lower then 0");

    const name = text.substring(0, Index);
    Index = Index + 1;
    const value = text.substring(Index, text.length);

    if (name === "scores") {
      if (value.startsWith("{") && value.endsWith("}")) {
        parseParameters(value.substring(1, value.length - 1), Index + offset + 1, selector, selector.scores);
      }
    } else {
      receiver.push(new SelectorAttribute(name, value, offset));
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

  /**TODO add documentation
   *
   * @param p
   * @param cursor
   * @returns
   */
  export function isCursor(p: SelectorAttribute, cursor: number): boolean {
    if (p.offset >= cursor) {
      if (cursor <= getEndOffset(p)) return true;
    }

    return false;
  }

  /**TODO add documentation
   *
   * @param p
   * @returns
   */
  export function getEndOffset(p: SelectorAttribute): number {
    return p.name.length + p.value.length + 1 + p.offset;
  }
}
