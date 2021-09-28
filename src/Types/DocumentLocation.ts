import { JsonPath } from "./JsonPath";
import { OffsetWord } from './OffsetWord';
import { Position } from "./Position";
import { Range } from "./Range";

/**The type of a document location */
export type DocumentLocation = Position | OffsetWord | JsonPath | number;

/** */
export type TextOrDoc = string | { getText(): string };

function ToText(value: TextOrDoc): string {
  return typeof value === "string" ? value : value.getText();
}

/**TODO add documentation
 *
 */
export namespace DocumentLocation {
  /**TODO add documentation
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
        if (OffsetWord.is(data)) {
          return data.offset;
        }

        return Position.toOffset(data, ToText(text));

      default:
        return 0;
    }
  }

  const NewLine = "\n".charCodeAt(0);

  /**TODO add documentation
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
        if (OffsetWord.is(data)) {
          return Position.toPosition(data.offset, data.text);
        }

        return data;

      default:
        return Position.create(0, 0);
    }
  }

  /**TODO add documentation
   *
   * @param data
   * @param text
   * @param length
   * @returns
   */
  export function ToRange(data: DocumentLocation, text: TextOrDoc, length: number): Range {
    if (OffsetWord.is(data)) {
      const t = data.text;
      return Range.create(Position.toPosition(data.offset, t), Position.toPosition(data.offset + t.length, t));
    }

    const startindex = toOffset(data, text);
    const endindex = startindex + length;
    const t = ToText(text);

    return Range.create(Position.toPosition(startindex, t), Position.toPosition(endindex, t));
  }
}
