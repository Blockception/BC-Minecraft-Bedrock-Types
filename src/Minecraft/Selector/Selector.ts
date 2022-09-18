import { Modes } from "../../Modes/Modes";
import { OffsetWord } from "../../Types";
import { Attribute, AttributeContainer } from "./Attributes/Attribute";
import { AttributeContainerReader, AttributeReader } from "./Attributes/Reader";
import { ParseSelector } from "./Parse";
import { SelectorType } from "./SelectorTypes";

/**
 * The class that represents a selector.
 */
export class Selector {
  /**
   * @example '@a' | '@e'
   */
  private _type: SelectorType;
  /**
   *
   */
  private _data: AttributeContainer;

  constructor(type?: SelectorType, data?: AttributeContainer) {
    this._type = type || "@a";
    this._data = data || {};
  }

  get type(): SelectorType {
    return this._type;
  }

  get data(): AttributeContainer {
    return this._data;
  }

  /**
   *
   * @param attribute
   * @returns
   */
  get(attribute: string): Attribute[] {
    let values = this._data[attribute];

    if (!values) {
      values = [];
      this._data[attribute] = values;
    }

    return values;
  }

  /**
   *
   * @param attribute
   * @param value
   */
  push(attribute: string, value: Attribute): void {
    this.get(attribute)?.push(value as any);
  }

  /**
   * Counts the amount of attributes
   * @param attribute The attribute to count
   * @returns The amount of attributes
   */
  count(attribute: string): number {
    return this.get(attribute).length;
  }

  /**
   * Checks if the selector contains the attribute
   * @param attribute The attribute to check for
   * @returns True if the attribute is present
   */
  contains(attribute: string): boolean {
    return this.count(attribute) > 0;
  }

  /**
   * Loops over all attributes
   * @param callback The callback to call for each attribute
   */
  forEach(callback: (attribute: string, values: Attribute) => void): void {
    for (const attribute in this._data) {
      this.get(attribute).forEach((item) => callback(attribute, item));
    }
  }

  /**
   * Returns the first attribute
   * @returns A reader
   */
  read() {
    return new AttributeContainerReader(this._data);
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
      type = type.type;
    }

    return Modes.SelectorType.isValue(type);
  }

  /**
   * Parses the given text into a selector.
   * @param text The text to parse.
   * @param offset The offset of the text
   * @returns The parsed selector. or undefined if something went wrong
   */
  export function parse(text: string, offset?: number): Selector;
  export function parse(word: OffsetWord): Selector;

  export function parse(text: string | OffsetWord, offset?: number): Selector | undefined {
    if (typeof text === "string") {
      text = OffsetWord.create(text, offset);
    }

    return ParseSelector(text);
  }
}
