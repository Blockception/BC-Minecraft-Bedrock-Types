import { JsonPath } from "../Json/JsonPath";
import { Position } from "../Position/Position";
import { Range } from "../Range/Range";

/**The type of a document location */
export type DocumentLocation = Position | JsonPath | number;

type TextOrDoc = string | { getText(): string };

function ToText(value: TextOrDoc): string {
  return typeof value === "string" ? value : value.getText();
}

/**
 *
 */
export namespace DocumentLocation {
  /**
   *
   * @param data
   * @param text
   * @returns
   */
  export function toOffset(data: DocumentLocation, text: TextOrDoc): number {
    switch (typeof data) {
      case "number":
        return data;

      //Json path
      case "string":
        return JsonPath.resolve(text, data);

      //Position
      case "object":
        return Position.toOffset(data, ToText(text));

      default:
        return 0;
    }
  }

  const NewLine = "\n".charCodeAt(0);

  /**
   *
   * @param data
   * @param text
   * @returns
   */
  export function toPosition(data: DocumentLocation, text: TextOrDoc): Position {
    switch (typeof data) {
      case "number":
        return Position.toPosition(data, ToText(text));

      //Json path
      case "string":
        return Position.toPosition(JsonPath.resolve(text, data), ToText(text));

      //Position
      case "object":
        return data;

      default:
        return Position.create(0, 0);
    }
  }

  /**
   *
   * @param data
   * @param text
   * @param length
   * @returns
   */
  export function ToRange(data: DocumentLocation, text: TextOrDoc, length: number): Range {
    const startindex = toOffset(data, text);
    const endindex = startindex + length;
    const t = ToText(text);

    return Range.create(Position.toPosition(startindex, t), Position.toPosition(endindex, t));
  }
}
