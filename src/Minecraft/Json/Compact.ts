import { findCommaOrEnd, trimBraces } from "./Grammar";

/**
 * Namespace that governs minecraft "compact json"
 */
export namespace CompactJson {
  /** The type of a node */
  export enum Type {
    /** A string */
    String = 0,
    /** An object */
    Object = 1,
    /** An array */
    Array = 2,
  }

  /** The base of an node */
  export interface IBase {
    /** The offset this node was found */
    offset: number;
    /** If this value is negative check */
    negative: boolean;
  }

  /** The different types of nodes */
  export type INode = IObject | IArray | IString;
  /** A node that has a key value */
  export type IKeyNode = { key: string } & INode;

  /**
   * Returns true if the node is a key node
   * @param value The value to check
   * @returns True if the node is a key node
   */
  export function hasKey(value: any): value is { key: string } {
    return typeof value.key === "string";
  }

  /**
   * Returns true if the node is a string node
   * @param value The value to check
   * @returns True if the node is a string node
   */
  export function isString(value: INode): value is IString {
    return value.type === Type.String;
  }

  /**
   * Returns true if the node is an object node
   * @param value The value to check
   * @returns True if the node is an object node
   */
  export function isObject(value: INode): value is IObject {
    return value.type === Type.Object;
  }
  /**
   * Returns true if the node is an object array
   * @param value The value to check
   * @returns True if the node is an object array
   */
  export function isArray(value: INode): value is IArray {
    return value.type === Type.Array;
  }

  export function isArrayOrObject(value: INode): value is IArray | IObject {
    return isArray(value) || isObject(value);
  }

  /** A string node */
  export interface IString extends IBase {
    /** The type of this node */
    type: Type.String;
    /** The value of this node */
    value: string;
  }

  /** An object node */
  export interface IObject extends IBase {
    /** The type of this node */
    type: Type.Object;
    /** The value of this node */
    value: IKeyNode[];
  }

  /** An array node */
  export interface IArray extends IBase {
    /** The type of this node */
    type: Type.Array;
    /** The value of this node */
    value: (INode | IKeyNode)[];
  }

  /**
   * Parses a string into a node
   * @param text The text to parse
   * @param offset The offset of the text starts at
   * @returns The parsed node
   */
  export function parse(text: string, offset: number = 0): INode {
    let negative = false;
    let node: INode;
    if (text.startsWith("!")) {
      negative = true;
      text = text.slice(1);
    }

    if (text.startsWith("[")) {
      node = {
        type: Type.Array,
        offset: offset + 1,
        negative: negative,
        value: [],
      };

      text = trimBraces(text);
      offset += 1;
      parseItems(text, offset, node);
    } else if (text.startsWith("{")) {
      node = {
        type: Type.Object,
        offset: offset + 1,
        negative: negative,
        value: [],
      };

      text = trimBraces(text);
      offset += 1;
      parseItems(text, offset, node as any);
    } else {
      node = {
        type: Type.String,
        offset: offset,
        negative: negative,
        value: text,
      };
    }

    return node;
  }

  /**
   *
   * @param node
   * @returns
   */
  export function stringify(node: INode | IKeyNode): string {
    const key = hasKey(node) ? node.key + "=" : "";

    switch (node.type) {
      case Type.String:
        return key + node.value;
      case Type.Object:
        return key + "{" + node.value.map(stringify).join(",") + "}";
      case Type.Array:
        return key + "[" + node.value.map(stringify).join(",") + "]";
    }
  }

  export function empty(): IString {
    return {
      type: Type.String,
      offset: 0,
      negative: false,
      value: "",
    };
  }
}

/**
 * Parses a list of items into nodes
 * @param text The text to parse
 * @param offset The offset of the text starts at
 * @param receiver The node to add the items to
 */
function parseItems(text: string, offset: number, receiver: CompactJson.IArray) {
  let index = findCommaOrEnd(text);

  while (index > 0) {
    const attr = text.slice(0, index);

    if (attr.startsWith("{") || attr.endsWith("[")) {
      const node = CompactJson.parse(attr, offset);
      receiver.value.push(node);
    } else {
      const equalIndex = attr.indexOf("=");

      if (equalIndex > 0) {
        const key = attr.slice(0, equalIndex);
        const value = attr.slice(equalIndex + 1);

        const node = CompactJson.parse(value, offset + equalIndex + 1) as CompactJson.IKeyNode;
        node.key = key;
        node.offset = offset;
        receiver.value.push(node);
      } else {
        const value = attr;

        const node = CompactJson.parse(value, offset);
        receiver.value.push(node);
      }
    }

    text = text.slice(index + 1);
    offset += index + 1;
    index = findCommaOrEnd(text);
  }
}
