import { OffsetWord } from "../../Types/include";

export class SelectorValueAttribute {
  /** */
  public offset: number;
  /** */
  public name: string;
  /** */
  public value: string;

  /**TODO add documentation
   * @param name
   * @param value
   * @param offset*/
  constructor(name: string, value: string, offset: number = 0) {
    this.name = name;
    this.value = value;
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
  getValueOffset() : number {
    return this.offset + this.offset + 1;
  }

  isCursorHere(cursor : number) : boolean {
    return cursor >= this.offset && cursor <= (this.offset + this.name.length + this.value.length + 1);
  }

  /**
   * 
   * @returns 
   */
  toString(): string {
    return `${this.name}=${this.value}`;
  }
}

export namespace SelectorValueAttribute {
  /**
   * 
   * @param text 
   * @param offset 
   * @returns 
   */
  export function parse(text : string, offset : number = 0) : SelectorValueAttribute {
    const index = text.indexOf("=");
    const name = text.substring(0, index);
    const value = text.substring(index + 1);

    return new SelectorValueAttribute(name, value, offset);
  }
}
