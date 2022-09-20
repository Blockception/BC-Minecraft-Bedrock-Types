import { Attribute } from "./Attribute";
import { HasItemData } from "./HasItem";
import { ScoreData } from "./Scores";

/** */
export interface BaseData {
  /**The amount of entities*/
  c: Array<Attribute<string>>;

  /** The amount of blocks width the selection is */
  dx: Array<Attribute<string>>;
  /** The amount of blocks height the selection is */
  dy: Array<Attribute<string>>;
  /** The amount of blocks depth the selection is */
  dz: Array<Attribute<string>>;

  /** The family of the entity */
  family: Array<Attribute<string>>;
  /** The items the entity is holding */
  hasitem: Array<Attribute<HasItemData>>;

  /** The maximum amount of xp the entity has */
  l: Array<Attribute<string>>;
  /** The minimum amount of xp the entity has */
  lm: Array<Attribute<string>>;

  /** The gamemode of the entity */
  m: Array<Attribute<string>>;
  /** The name of the entity */
  name: Array<Attribute<string>>;

  /** The maximum radius of the selection */
  r: Array<Attribute<string>>;
  /** The minimum radius of the selection */
  rm: Array<Attribute<string>>;

  /** The maximum rotation around x axis of the entity */
  rx: Array<Attribute<string>>;
  /** The minimum rotation around x axis of the entity */
  rxm: Array<Attribute<string>>;
  /** The maximum rotation around y axis of the entity */
  ry: Array<Attribute<string>>;
  /** The minimum rotation around y axis of the entity */
  rym: Array<Attribute<string>>;

  /** The scores the entity has */
  scores: Array<Attribute<ScoreData>>;
  /** The tags the entity has */
  tag: Array<Attribute<string>>;
  /** The type of the entity */
  type: Array<Attribute<string>>;

  /** The X position of the entity */
  x: Array<Attribute<string>>;
  /** The Y position of the entity */
  y: Array<Attribute<string>>;
  /** The Z position of the entity */
  z: Array<Attribute<string>>;
}

type GetElementType<T extends any[] | undefined> = T extends (infer U)[] ? U : never;
export type BaseAttribute = keyof BaseData;
export type BaseAttributeType<T extends keyof BaseData> = BaseData[T];
export type BaseAttributeItemType<T extends keyof BaseData> = GetElementType<BaseAttributeType<T>>;
