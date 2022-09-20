import { CompactJson } from "./Compact";

/** Parses a list of items into nodes */
export class CompactJsonReader {
  private _data: CompactJson.INode;

  /**
   * Creates a new instance of the CompactJsonReader class
   * @param data The data to read
   */
  constructor(data: CompactJson.INode) {
    this._data = data;
  }

  /** The type of the node */
  get type() {
    return this._data.type;
  }

  /** The offset this node was found at */
  get offset() {
    return this._data.offset;
  }

  /** If the value of this node is negative or not */
  get negative() {
    return this._data.negative;
  }

  /** The value of the node */
  get value() {
    return this._data.value;
  }

  /**
   * Gets the name of child nodes
   * @returns The names of the child nodes
   */
  names(): string[] {
    const data = this._data;
    const names: string[] = [];

    if (CompactJson.isString(data)) {
      return names;
    }

    for (const item of data.value) {
      if (CompactJson.hasKey(item)) {
        names.push(item.key);
      }
    }

    return names;
  }

  /**
   * Gets the value of the node at the specified index
   * @param name The name of the node to get
   * @returns The value of the node
   */
  get(name: string): CompactJsonReader[] {
    const result: CompactJsonReader[] = [];
    const data = this._data;

    if (CompactJson.isString(data)) {
      return result;
    }

    for (const item of data.value) {
      if (CompactJson.hasKey(item) && item.key === name) {
        result.push(new CompactJsonReader(item));
      }
    }

    return result;
  }

  /**
   * loops through all the items in the node
   * @param callbackfn The callback function to call for each item
   * @returns The result of the callback function
   */
  forEach(callbackfn: (value: CompactJsonReader, index: number) => void) {
    const data = this._data;

    if (CompactJson.isString(data)) {
      return;
    }

    for (let i = 0; i < data.value.length; i++) {
      callbackfn(new CompactJsonReader(data.value[i]), i);
    }
  }

  /**
   * Check if the node has a child node with the specified name
   * @param name The name of the node to check
   * @returns True if the node has a child node with the specified name
   */
  contains(name: string): boolean {
    const data = this._data;

    if (CompactJson.isString(data)) {
      return false;
    }

    for (const item of data.value) {
      if (CompactJson.hasKey(item) && item.key === name) {
        return true;
      }
    }

    return false;
  }
}
