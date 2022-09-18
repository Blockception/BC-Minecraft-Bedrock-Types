import { Attribute, AttributeArray, AttributeContainer, AttributeObject, AttributeString, AttributeType } from "./Attributes/Attribute";

export class PartBuilder {
  private _data: AttributeContainer;

  constructor(data?: AttributeContainer) {
    this._data = data || {};
  }

  get(key: string): Attribute[] {
    let values = this._data[key];

    if (values === undefined) {
      values = [];
      this._data[key] = values;
    }

    return values;
  }

  startNew(key: string, offset?: number, negative?: boolean): Attribute {
    const base: Partial<Attribute> = {
      offset: offset || 0,
      negative: negative || false,
      value: undefined,
    };

    this.get(key).push(base as Attribute);
    return base as Attribute;
  }

  startNewString(key: string, value: string, offset?: number, negative?: boolean): AttributeString {
    const n = this.startNew(key, offset, negative) as AttributeString;
    n.type = AttributeType.String;
    n.value = value;

    return n;
  }

  startNewObject(key: string, offset?: number, negative?: boolean): { attribute: AttributeObject; builder: PartBuilder } {
    const n = this.startNew(key, offset, negative) as AttributeObject;
    n.type = AttributeType.Object;
    n.value = {};

    return { attribute: n, builder: new PartBuilder(n.value) };
  }

  startNewArray(key: string, offset?: number, negative?: boolean): { attribute: AttributeArray; builder: PartArrayBuilder } {
    const n = this.startNew(key, offset, negative) as AttributeArray;
    n.type = AttributeType.Array;
    n.value = [];

    return { attribute: n, builder: new PartArrayBuilder(n.value) };
  }

  get data() {
    return this._data;
  }
}

export class PartArrayBuilder {
  private _data: AttributeContainer[];

  constructor(data?: AttributeContainer[]) {
    this._data = data || [];
  }

  startNew(): PartBuilder {
    const base: AttributeContainer = {};
    this._data.push(base);
    return new PartBuilder(base);
  }

  get data() {
    return this._data;
  }
}
