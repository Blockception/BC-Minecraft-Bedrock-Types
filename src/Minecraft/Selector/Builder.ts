import { Attribute } from "./Attributes/Attribute";
import { BaseAttributeItemType, BaseData } from "./Attributes/Base";
import { HasItemData } from "./Attributes/HasItem";
import { ScoreData } from "./Attributes/Scores";
import { Selector } from "./Selector";
import { SelectorType } from "./SelectorTypes";

type GetElementType<T extends any[] | undefined> = T extends (infer U)[] ? U : never;
type Data = BaseData | HasItemData | ScoreData;
type DataKey<T> = keyof T;
type DataType<T extends Data, U extends DataKey<T>> = any[] & T[U];
type DataItemType<T extends Data, U extends DataKey<T>> = GetElementType<DataType<T, U>>;

function test<T extends Data, U extends DataKey<T>>(value: DataType<T, U>): void {}

/**
 *
 */
export class PartBuilder<T extends Data> {
  protected _data: Partial<T>;

  /**
   *
   * @param data
   */
  constructor(data?: T) {
    this._data = data || {};
  }

  get<U extends keyof T>(attribute: U): DataType<T, U> {
    let values = this._data[attribute] as DataType<T, U>;

    if (values === undefined) {
      values = [] as DataType<T, U>;
      this._data[attribute] = values;
    }

    return values;
  }

  push<U extends keyof T>(attribute: U, value: DataItemType<T, U>): this {
    const values = this.get(attribute);
    values.push(value);

    return this;
  }

  startSub<U extends keyof T>(attribute: U, offset: number = 0): PartBuilder<DataItemType<T, U>> {
    const values = this.get(attribute);
    const item = { offset, negative: false, value: {} } as DataItemType<T, U>;
    values.push(item);

    return new PartBuilder<DataItemType<T, U>>(item.value);
  }
}

/**
 * The selector builder
 */
export class SelectorBuilder extends PartBuilder<BaseData> {
  private _type: SelectorType;

  constructor(type?: SelectorType, data?: BaseData) {
    super(data);
    this._type = type || "@e";
    this._data = data || {};
  }

  /**
   *
   * @returns
   */
  toSelector(): Selector {
    return new Selector(this._type, this._data as Partial<BaseData>);
  }

  /**
   *
   * @param offset
   * @returns
   */
  startScores(offset = 0): PartBuilder<ScoreData> {
    return this.startSub("scores", offset);
  }

  /**
   *
   * @param offset
   * @returns
   */
  startHasItem(offset = 0): PartBuilder<HasItemData> {
    return this.startSub("hasitem", offset);
  }
}
