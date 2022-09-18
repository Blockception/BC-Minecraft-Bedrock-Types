export type AttributeContainer = Record<string, Attribute[]>;

export enum AttributeType {
  String = 0,
  Object = 1,
  Array = 2,
}

export interface AttributeBase {
  /**
   *
   */
  offset: number;
  /**
   *
   */
  negative: boolean;
}

export interface AttributeString extends AttributeBase {
  type: AttributeType.String;
  value: string;
}

export interface AttributeObject extends AttributeBase {
  type: AttributeType.Object;
  value: AttributeContainer;
}

export interface AttributeArray extends AttributeBase {
  type: AttributeType.Array;
  value: AttributeContainer[];
}

export type Attribute = AttributeString | AttributeObject | AttributeArray;

export namespace Attribute {
  export function is(attr: any): attr is Attribute {
    if (typeof attr !== "object") {
      return false;
    }

    if (typeof attr.negative !== "boolean") return false;
    if (typeof attr.offset !== "number") return false;
    if (typeof attr.value === "string") return true;
    if (typeof attr.value === "object") return true;

    return false;
  }

  export function isArray(attr: any): attr is Attribute[] {
    if (!Array.isArray(attr)) {
      return false;
    }

    for (const item of attr) {
      if (!Attribute.is(item)) {
        return false;
      }
    }

    return true;
  }

  export function toString(attribute: Attribute): string {
    let result = attribute.negative ? "!" : "";
    result += attribute.value;
    return result;
  }
}
