import { OffsetWord } from "../../Types";
import { Selector } from "./Selector";

/**
 *
 * @param text
 * @returns
 */
export function ParseSelector(text: string | OffsetWord): Selector | undefined {
  let offset = 0;
  if (typeof text === "object") {
    offset = text.offset;
    text = text.text;
  }

  //Not a selector?
  if (!text.startsWith("@")) return undefined;

  const selector = new Selector();

  let index = text.indexOf("[");
  if (index === -1) {
    index = text.length;
  }

  selector.type = text.substring(0, index);
  text = text.substring(index);

  if (text.startsWith('[') && text.endsWith(']')) {}
  else {
    return undefined;
  }

  text = text.substring(1, text.length - 1);




  return;
}
