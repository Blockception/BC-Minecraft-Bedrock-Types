import { BaseAttribute, BaseAttributeItemType } from "./Base";
import { HasItemData } from "./HasItem";
import { ScoreData } from "./Scores";

export interface Attribute<T extends string | HasItemData | ScoreData> {
  /**
   *
   */
  offset: number;
  /**
   *
   */
  negative: boolean;
  /**
   *
   */
  value: T;
}

export namespace Attribute {
  export function is(attr: any): attr is Attribute<string | object> {
    if (typeof attr !== "object") {
      return false;
    }

    if (typeof attr.negative !== "boolean") return false;
    if (typeof attr.offset !== "number") return false;
    if (typeof attr.value === "string") return true;
    if (typeof attr.value === "object") return true;

    return false;
  }

  export function isArray(attr: any): attr is Attribute<string | object>[] {
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

  export function cast<T extends BaseAttribute>(attr: Attribute<string | object>): BaseAttributeItemType<T> {
    return attr as BaseAttributeItemType<T>;
  }

  export function toString(attribute: Attribute<string | object>): string {
    let result = attribute.negative ? "!" : "";
    result += attribute.value;
    return result;
  }
}
