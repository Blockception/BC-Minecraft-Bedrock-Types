import { off } from "process";
import { Modes } from "../../Modes/Modes";
import { OffsetWord } from "../../Types";
import { CompactJson } from "../Json/Compact";
import { CompactJsonReader } from "../Json/Reader";
import { SelectorType } from "./SelectorTypes";

/**
 * The class that represents a selector.
 */
export class Selector extends CompactJsonReader {
  /**
   * @example '@a' | '@e'
   */
  private _type: SelectorType;
  private _offset: number;

  constructor(type?: SelectorType, offset?: number, data?: CompactJson.IArray) {
    super(data || CompactJson.empty());
    this._type = type || "@a";
    this._offset = offset || 0;
  }

  get selectorType() {
    return this._type;
  }

  get selectorOffset() {
    return this._offset;
  }
}

/**
 * The namespace for the `Selector` class.
 */
export namespace Selector {
  /**
   * Returns
   * @param type
   * @returns
   */
  export function isValidType(type: string | Selector): boolean {
    if (typeof type !== "string") {
      type = type.selectorType;
    }

    return Modes.SelectorType.isValue(type);
  }

  /**
   * Parses the given text into a selector.
   * @param text The text to parse.
   * @param offset The offset of the text
   * @returns The parsed selector. or undefined if something went wrong
   */
  export function parse(text: string, offset?: number): Selector | undefined;
  export function parse(word: OffsetWord): Selector | undefined;

  export function parse(text: string | OffsetWord, offset?: number): Selector | undefined {
    if (typeof text !== "string") {
      offset = text.offset;
      text = text.text;
    }
    offset = offset || 0;

    const index = text.indexOf("[");

    if (index === -1) {
      return new Selector(text as SelectorType);
    }

    const type = text.slice(0, index) as SelectorType;
    const data = CompactJson.parse(text.slice(index), offset + index);

    if (CompactJson.isArray(data)) {
      return new Selector(type, offset, data);
    }

    return undefined;
  }
}
