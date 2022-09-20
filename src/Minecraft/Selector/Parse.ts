import { OffsetWord } from "../../Types";
import { Attribute } from "./Attributes/Attribute";
import { BaseAttribute } from "./Attributes/Base";
import { SelectorBuilder } from "./Builder";
import { findCommaOrEnd } from "./Grammar";
import { Selector } from "./Selector";
import { SelectorType } from "./SelectorTypes";

/**
 *
 * @param text
 * @returns
 */
export function ParseSelector(word: OffsetWord): Selector | undefined {
  let { offset, text } = word;

  //Not a selector?
  if (!text.startsWith("@")) return undefined;

  let index = text.indexOf("[");
  if (index === -1) {
    index = text.length;
  }

  const type = text.substring(0, index) as SelectorType;
  const builder = new SelectorBuilder(type);

  text = text.substring(index);

  //Get attributes
  if (text.startsWith("[") && text.endsWith("]")) {
  } else {
    return undefined;
  }

  text = text.substring(1, text.length - 1);
  ParseValue(text, offset + index + 1, builder);

  return builder.toSelector();
}

function ParseValue(text: string, offset: number, builder: SelectorBuilder): void {
  const index = text.indexOf("=");

  if (index <= 0) return;

  const attribute = text.slice(0, index).trim() as BaseAttribute;
  const value = text.slice(index + 1).trim();
  const end = findCommaOrEnd(value);

  if (end === -1) {
    throw new Error("Invalid selector");
  }

  const attrValue = value.slice(0, end);
  ProcessAttribute(attribute, attrValue, offset, builder);

  const next = value.slice(end + 1);
  if (next.length > 0) {
    ParseValue(next, offset + end + 1, builder);
  }
}

function ProcessAttribute(attribute: BaseAttribute, value: string, offset: number, builder: SelectorBuilder): void {
  const item: Partial<Attribute<string | object>> = {
    offset: offset,
    negative: false,
    value: undefined,
  };

  if (value.startsWith("!")) {
    item.negative = true;
    value = value.substring(1);
  }

  if (value.startsWith("{")) {
  }

  if (item.value !== undefined) {
    builder.push(attribute, item);
  }
}
