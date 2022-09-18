import { Attribute, AttributeArray, AttributeBase, AttributeContainer, AttributeObject, AttributeString, AttributeType } from "./Attribute";

/** A reader of selector attributes */
class BaseAttributeReader<T extends AttributeBase> implements AttributeBase {
  /** The attribute data set to read from */
  protected _data: T;
  /** The key string of the attribute */
  protected _key: string;

  /**
   * Creates a new instance of the reader
   * @param key The key of the attribute
   * @param data The attribute data set to read from
   */
  constructor(data: T, key: string = "") {
    this._key = key;
    this._data = data;
  }

  /** Returns the key of the attribute */
  get key(): string {
    return this._key;
  }

  /** Returns the offset of the attribute */
  get offset(): number {
    return this._data.offset;
  }

  /** Returns the offset of the value of the attribute */
  get offsetValue(): number {
    // key=!value
    return this.offset + this._key.length + 1 + (this.negative ? 0 : 1);
  }

  /** Returns if this attribute is negative or not*/
  get negative(): boolean {
    return this._data.negative;
  }

  /** Returns type of attribute */
  get type(): AttributeType {
    return (this._data as any).type as AttributeType;
  }

  /** Returns the value of the attribute */
  get value() {
    return (this._data as any).value;
  }
}

/** A reader of a container*/
export class AttributeContainerReader {
  /** The attribute data set to read from */
  protected _data: AttributeContainer;
  /** The key string of the attribute */
  protected _key: string;

  /** @inheritdoc */
  constructor(data: AttributeContainer, key: string = "") {
    this._data = data;
    this._key = key;
  }

  /** Returns the attributes in the data */
  attributes(): string[] {
    return Object.getOwnPropertyNames(this._data);
  }

  /** Returns the data of the attribute */
  attribute(key: string) {
    return (this._data[key] ?? []).map((m) => AttributeReader.read(m, key));
  }

  forEach(callbackfn: (reader: AttributeObjectReader | AttributeArrayReader | AttributeStringReader) => void) {
    for (const key in this._data) {
      this.attribute(key).forEach(callbackfn);
    }
  }
}

/** A reader of an object attribute*/
export class AttributeObjectReader extends BaseAttributeReader<AttributeObject> {
  /** The reader for the inside container */
  private _reader: AttributeContainerReader;

  /** @inheritdoc */
  constructor(data: AttributeObject, key: string = "") {
    super(data, key);
    this._reader = new AttributeContainerReader(this._data.value);
  }

  /**
   * Returns the names of attributes in the data
   * @returns The names of attributes in the data
   */
  attributes(): string[] {
    return this._reader.attributes();
  }

  /**
   * Returns the data of the attribute
   * @param key The key of the attribute
   * @returns The data of the attribute
   */
  attribute(key: string) {
    return this._reader.attribute(key);
  }

  forEach(callbackfn: (item: AttributeObjectReader | AttributeArrayReader | AttributeStringReader) => void) {
    this._reader.forEach(callbackfn);
  }
}

/**
 * A reader of an array attribute
 */
export class AttributeArrayReader extends BaseAttributeReader<AttributeArray> {
  /** @inheritdoc */
  constructor(data: AttributeArray, key: string = "") {
    super(data, key);
  }

  /**
   * Returns the data of the attribute
   */
  get items() {
    return this._data.value.map((m) => new AttributeContainerReader(m, this._key));
  }

  forEach(callbackfn: (item: AttributeContainerReader) => void) {
    this.items.forEach((item) => callbackfn(item));
  }
}

/**
 * A reader of a string attribute
 */
export class AttributeStringReader extends BaseAttributeReader<AttributeString> {
  /** @inheritdoc */
  constructor(data: AttributeString, key: string = "") {
    super(data, key);
  }
}

/**
 * A namespace for reading attributes
 */
export namespace AttributeReader {
  /**
   * Reads an attribute
   * @param data The data to read from
   * @param key The key of the attribute
   * @returns The attribute reader
   */
  export function read(data: Attribute, key: string = ""): AttributeObjectReader | AttributeArrayReader | AttributeStringReader {
    switch (data.type) {
      case AttributeType.Object:
        return new AttributeObjectReader(data as AttributeObject, key);

      case AttributeType.Array:
        return new AttributeArrayReader(data as AttributeArray, key);

      case AttributeType.String:
        return new AttributeStringReader(data as AttributeString, key);
    }

    throw new Error("Invalid attribute type");
  }
}
