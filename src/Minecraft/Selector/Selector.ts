import { Modes } from "../../Modes/Modes";
import { OffsetWord } from "../../Types";
import { BaseAttribute, BaseAttributeItemType, BaseAttributeType, BaseData } from "./Attributes/Base";
import { Attribute } from "./Attributes/Attribute";
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
  private _data: Partial<BaseData>;

  constructor(type?: SelectorType, data?: Partial<BaseData>) {
    this._type = type || "@a";
    this._data = data || {};
  }

  get type(): SelectorType {
    return this._type;
  }

  get data(): Partial<BaseData> {
    return this._data;
  }

  /**
   *
   * @param attribute
   * @returns
   */
  get<T extends BaseAttribute>(attribute: T): BaseAttributeType<T> {
    let values = this._data[attribute] as BaseAttributeType<T> | undefined;

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
  push<T extends BaseAttribute>(attribute: T, value: BaseAttributeItemType<T>): void {
    this.get(attribute)?.push(value as any);
  }

  /**
   * Counts the amount of attributes
   * @param attribute The attribute to count
   * @returns The amount of attributes
   */
  count(attribute: BaseAttribute): number {
    return this.get(attribute)?.length || 0;
  }

  /**
   * Checks if the selector contains the attribute
   * @param attribute The attribute to check for
   * @returns True if the attribute is present
   */
  contains(attribute: BaseAttribute): boolean {
    return this.count(attribute) > 0;
  }

  /**
   *
   * @param callback
   */
  forEach(callback: (attribute: BaseAttribute, values: BaseAttributeItemType<BaseAttribute>) => void): void {
    for (const attribute in this._data) {
      const value = this._data[attribute as BaseAttribute];

      if (value) {
        value.forEach((item) => callback(attribute as BaseAttribute, item));
      }
    }
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
