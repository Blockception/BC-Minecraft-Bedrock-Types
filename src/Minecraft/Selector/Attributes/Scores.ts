import { Attribute } from "./Attribute";

/**
 *
 */
export type ScoreData = Record<string, Array<Attribute<string>>>;

export namespace ScoreData {
  export function is(value: any): value is ScoreData {
    if (typeof value !== "object") {
      return false;
    }

    for (const attribute of value) {
      if (!Attribute.isArray(attribute)) {
        return false;
      }
    }

    return true;
  }

  export function isArray(value: any): value is ScoreData[] {
    if (typeof value !== "object") {
      return false;
    }
    if (!Array.isArray(value)) {
      return false;
    }

    for (const item of value) {
      if (!ScoreData.is(item)) {
        return false;
      }
    }

    return true;
  }
}
