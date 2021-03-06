import { OffsetWord } from "../../Types/OffsetWord";
import { SelectorValueAttribute } from "./ValueAttribute";

export class SelectorItemAttribute {
  /** */
  public offset: number;
  /** */
  public name: "hasitem";
  /** */
  public values: SelectorValueAttribute[];

  /**TODO add documentation
   * @param name
   * @param value
   * @param offset
   */
  constructor(values: SelectorValueAttribute[], offset: number = 0) {
    this.name = "hasitem";
    this.offset = offset;
    this.values = values;
  }

  getName(): OffsetWord {
    return { text: this.name, offset: this.offset };
  }

  /**
   *
   * @returns
   */
  getValueOffset(): number {
    return this.offset + this.offset + 1;
  }

  isCursorHere(cursor: number): boolean {
    if (cursor >= this.offset && cursor <= this.offset + this.name.length + 1) return true;

    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i].isCursorHere(cursor)) return true;
    }

    return false;
  }

  toString(): string {
    return `${this.name}=${this.values.map((v) => v.toString()).join(",")}`;
  }
}

export namespace SelectorItemAttribute {
  /**
   *
   * @param text
   * @param offset
   * @returns
   */
  export function parse(text: string, offset: number = 0): SelectorItemAttribute {
    const index = text.indexOf("=");
    const valuetext = text.substring(index + 1, text.length);

    let matches = valuetext.match(/([a-z]+=[^\,\}\]]+)/gim);
    let values: SelectorValueAttribute[] = [];

    if (matches) {
      for (let i = 0; i < matches.length; i++) {
        const m = matches[i];
        const item = SelectorValueAttribute.parse(m, text.indexOf(m) + offset);
        values.push(item);
      }
    }

    return new SelectorItemAttribute(values, offset);
  }

  export function is(value: any): value is SelectorItemAttribute {
    if (typeof value === "object") {
      if (typeof value.offset !== "number") return false;
      if (value.name !== "hasitem") return false;
      if (!Array.isArray(value.values)) return false;

      return true;
    }

    return false;
  }
}
