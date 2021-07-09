import { Mode, ModeCollection } from './ModeCollection';

export class ModeHandler implements ModeCollection {
  /**The collection of different modes*/
  public Modes: Mode[];
  /**The name of the collection*/
  public Name: string;

  constructor(collection : ModeCollection) {
    this.Modes = collection.Modes;
    this.Name = collection.Name;
  }

  isValue(value : string) : boolean {
    return ModeCollection.isValue(this, value);
  }

  get(index : string | number) : Mode | undefined {
    return ModeCollection.get(this, index);
  }

  foreach(callbackfn: (value: Mode, index: number, array: Mode[]) => void, thisArg?: any): void {
    return this.Modes.forEach(callbackfn, thisArg);
  }
}