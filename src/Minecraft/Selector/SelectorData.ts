export type SelectorAttributes = keyof SelectorData;

export interface SelectorData {
  /**The amount of entities*/
  c?: SelectorAttribute[];

  /** The amount of blocks width the selection is */
  dx?: SelectorAttribute[];
  /** The amount of blocks height the selection is */
  dy?: SelectorAttribute[];
  /** The amount of blocks depth the selection is */
  dz?: SelectorAttribute[];

  /** The family of the entity */
  family?: SelectorAttribute[];
  /** The items the entity is holding */
  hasitem?: SelectorAttribute[];

  /** The maximum amount of xp the entity has */
  l?: SelectorAttribute[];
  /** The minimum amount of xp the entity has */
  lm?: SelectorAttribute[];

  /** The gamemode of the entity */
  m?: SelectorAttribute[];
  /** The name of the entity */
  name?: SelectorAttribute[];

  /** The maximum radius of the selection */
  r?: SelectorAttribute[];
  /** The minimum radius of the selection */
  rm?: SelectorAttribute[];

  /** The maximum rotation around x axis of the entity */
  rx?: SelectorAttribute[];
  /** The minimum rotation around x axis of the entity */
  rxm?: SelectorAttribute[];
  /** The maximum rotation around y axis of the entity */
  ry?: SelectorAttribute[];
  /** The minimum rotation around y axis of the entity */
  rym?: SelectorAttribute[];

  /** The scores the entity has */
  scores?: SelectorAttribute[];
  /** The tags the entity has */
  tag?: SelectorAttribute[];
  /** The type of the entity */
  type?: SelectorAttribute[];

  /** The X position of the entity */
  x?: SelectorAttribute[];
  /** The Y position of the entity */
  y?: SelectorAttribute[];
  /** The Z position of the entity */
  z?: SelectorAttribute[];
}

export interface SelectorHasItemData {
  /** The data value of the selector */
  data?: SelectorAttribute[];
  /**
   * The item identification
   * @required
   */
  item?: SelectorAttribute[];
  /** The amount of items */
  quantity?: SelectorAttribute[];
  /** The slot location of the item */
  location?: SelectorAttribute[];
  /** The slot number of the item */
  slot?: SelectorAttribute[];
}

export interface SelectorScoreData {
  [score: string]: SelectorAttribute[];
}

export interface SelectorAttribute {
  negative: boolean;
  offset: number;
  value: SelectorAttributeValue;
}

export type SelectorAttributeValue = SelectorTextAttribute | SelectorHasItemAttribute | SelectorScoreAttribute;

export interface SelectorTextAttribute {
  type: "text";
  value: string;
}

export interface SelectorHasItemAttribute {
  type: "hasitem";
  value: SelectorHasItemData[];
}

export interface SelectorScoreAttribute {
  type: "scores";
  value: SelectorScoreData[];
}
