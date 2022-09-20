/**
 * Minecraft "compact json"
 * [item=minecraft:stone,example={foo=bar},hasitem=[{item=minecraft:dirt},{item=minecraft:grass}]]
 */

import { equal } from "assert";
import { allowedNodeEnvironmentFlags } from "process";
import { findCommaOrEnd, trimBraces } from "./Grammar";

export namespace CompactJson {
  export enum Type {
    String = 0,
    Object = 1,
    Array = 2,
  }

  export interface IBase {
    offset: number;
    negative: boolean;
  }

  export type INode = IObject | IArray | IString;
  export type IKeyNode = { key: string } & INode;

  export interface IString extends IBase {
    type: Type.String;
    value: string;
  }

  export interface IObject extends IBase {
    type: Type.Object;
    value: IKeyNode[];
  }

  export interface IArray extends IBase {
    type: Type.Array;
    value: (INode | IKeyNode)[];
  }

  export function parse(text: string, offset: number = 0): INode {
    let negative = false;
    let node: INode;
    if (text.startsWith("!")) {
      negative = true;
      text = text.slice(1);
    }

    if (text.startsWith("[")) {
      node = {
        type: Type.Array,
        offset: offset + 1,
        negative: negative,
        value: [],
      };

      text = trimBraces(text);
      offset += 1;
      parseItems(text, offset, node);
    } else if (text.startsWith("{")) {
      node = {
        type: Type.Object,
        offset: offset + 1,
        negative: negative,
        value: [],
      };

      text = trimBraces(text);
      offset += 1;
      parseItems(text, offset, node as any);
    } else {
      node = {
        type: Type.String,
        offset: offset,
        negative: negative,
        value: text,
      };
    }

    return node;
  }
}

function parseItems(text: string, offset: number, receiver: CompactJson.IArray) {
  let index = findCommaOrEnd(text);

  while (index > 0) {
    const attr = text.slice(0, index);

    if (attr.startsWith("{") || attr.endsWith("[")) {
      const node = CompactJson.parse(attr, offset);
      receiver.value.push(node);
      
    } else {
      const equalIndex = attr.indexOf("=");

      if (equalIndex > 0) {
        const key = attr.slice(0, equalIndex);
        const value = attr.slice(equalIndex + 1);

        const node = CompactJson.parse(value, offset + equalIndex + 1) as CompactJson.IKeyNode;
        node.key = key;
        node.offset = offset;
        receiver.value.push(node);
      } else {
        const value = attr;

        const node = CompactJson.parse(value, offset);
        receiver.value.push(node);
      }
    }

    text = text.slice(index + 1);
    offset += index + 1;
    index = findCommaOrEnd(text);
  }
}
