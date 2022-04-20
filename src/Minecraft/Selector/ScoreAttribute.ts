import { OffsetWord } from "../../Types/include";
import { SelectorValueAttribute } from "./ValueAttribute";

export class SelectorScoreAttribute {
  /** */
  public offset: number;
  /** */
  public name: "scores";
  /** */
  public values: SelectorValueAttribute[];

  /**TODO add documentation
   * @param value
   * @param offset
   */
  constructor(value: SelectorValueAttribute[],offset: number = 0
  ) {
    this.name = "scores";
    this.values = value;
    this.offset = offset;
  }

  /**
   *
   * @returns
   */
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
    if (cursor >= this.offset && cursor <= this.offset + this.name.length + 1)
      return true;

    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i].isCursorHere(cursor)) return true;
    }

    return false;
  }

  toString(): string {
    return `${this.name}=${this.values.map((v) => v.toString()).join(",")}`;
  }
}

export namespace SelectorScoreAttribute {
  /** */
  export function parse(
    text: string,
    offset: number = 0
  ): SelectorScoreAttribute {
    const index = text.indexOf("=");
    const name = text.substring(0, index);
    const values = text
      .substring(index + 2, text.length - 1)
      .split(",")
      .map((v) => SelectorValueAttribute.parse(v, offset));

    return new SelectorScoreAttribute(values, offset);
  }

  export function is(value: any): value is SelectorScoreAttribute {
    if (typeof value === "object") {
      if (typeof value.offset !== "number") return false;
      if (value.name !== "scores") return false;
      if (!Array.isArray(value.values)) return false;

      return true;
    }

    return false;
  }
}
