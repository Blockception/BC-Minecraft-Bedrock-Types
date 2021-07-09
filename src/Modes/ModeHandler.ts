import { Mode, ModeCollection } from './ModeCollection';

export class ModeHandler implements ModeCollection {
  /**The collection of different modes*/
  public modes: Mode[];
  /**The name of the collection*/
  public name: string;

  constructor(collection : ModeCollection) {
    this.modes = collection.modes;
    this.name = collection.name;
  }

  isValue(value : string) : boolean {
    return ModeCollection.isValue(this, value);
  }

  get(index : string | number) : Mode | undefined {
    return ModeCollection.get(this, index);
  }

  foreach(callbackfn: (value: Mode, index: number, array: Mode[]) => void, thisArg?: any): void {
    return this.modes.forEach(callbackfn, thisArg);
  }
}