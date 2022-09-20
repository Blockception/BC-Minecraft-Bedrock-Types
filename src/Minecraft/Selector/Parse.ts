import { OffsetWord } from "../../Types";
import { PartArrayBuilder, PartBuilder } from "./Builder";
import { findCommaOrEnd, trimBraces } from "../Json/Grammar";
import { Selector } from "./Selector";
import { SelectorType } from "./SelectorTypes";

//This code will parses minecraft selector text such as  @a[x=1,y=2,z=3,hasitem=[{item=minecraft:stone}]] Into an object

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
  const builder = new PartBuilder();

  text = text.substring(index);

  //Get attributes
  if (text.startsWith("[") && text.endsWith("]")) {
    text = text.substring(1, text.length - 1);

    parseItems(text, offset + index + 1, builder);
  } else {
    return undefined;
  }

  return new Selector(type, builder.data);
}

function parseItems(text: string, offset: number, builder: PartBuilder): void {
  while (text.length > 0) {
    let index = findCommaOrEnd(text);
    if (index === -1) {
      return;
    }

    let attr = text.substring(0, index);
    parseItem(attr, offset, builder);
    text = text.substring(index + 1);
    offset += index + 1;
  }
}

function parseItem(text: string, offset: number, builder: PartBuilder): void {
  let index = text.indexOf("=");
  let key: string;
  let value: string;
  let negative = false;

  if (index === -1) {
    key = "";
    value = text;
  } else {
    key = text.substring(0, index);
    value = text.substring(index + 1);
  }

  if (value.startsWith("!")) {
    negative = true;
    value = value.substring(1);
  }

  //Value is an object or array
  if (value.startsWith("{") || value.startsWith("[")) {
    const { builder: arrayBuilder } = builder.startNewArray(key, offset, negative);
    let part = trimBraces(value);
    offset += index + 2 + (negative ? 1 : 0);
    parseArray(part, offset, arrayBuilder);
  }
  //Value is a string
  else {
    builder.startNewString(key, value, offset, negative);
  }
}

function parseArray(part: string, offset: number, arrayBuilder: PartArrayBuilder): void {
  while (part.length > 0) {
    let index = findCommaOrEnd(part);
    if (index === -1) {
      return;
    }

    const partBuilder = arrayBuilder.startNew();
    let attr = part.substring(0, index);
    parseItem(attr, offset, partBuilder);
    part = part.substring(index + 1);
    offset += index + 1;
  }
}
