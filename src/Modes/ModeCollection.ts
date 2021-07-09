/** The interface that marks a gamemode*/
export interface ModeCollection {
  /**The collection of different modes*/
  Modes: Mode[];
  /**The name of the collection*/
  Name: string;
}

/** The mode interface */
export interface Mode {
  /**The name of this mode*/
  Name: string;
  /**The description of this mode*/
  Description: string;
}

export namespace ModeCollection {
  /** */
  export function is(value: any): value is ModeCollection {
    if (value) {
      let temp = value as ModeCollection;

      if (temp.Name && temp.Modes && Array.isArray(value.Modes)) return true;
    }

    return false;
  }

  /**
   * 
   */
  export function isValue(Collection : ModeCollection, value : string) : boolean {
    const M = Collection.Modes;

    for (var I = 0; I < M.length; I++) {
      const elemt = M[I];

      if (elemt.Name === value) return true;
    }

    return false;
  }

  /**
   * 
   * @param Collection 
   * @param index 
   * @returns 
   */
  export function get(Collection : ModeCollection, index : string | number) : Mode | undefined {
    if (typeof index === "string") {
      const M = Collection.Modes;

      for (var I = 0; I < M.length; I++) {
        const elemt = M[I];
  
        if (elemt.Name === index) return elemt;
      }
    }
    else {
      return Collection.Modes[index];
    }

    return undefined;
  }
}

/** */
export namespace Mode {
  /**
   * 
   * @param value 
   * @returns 
   */
  export function is(value: any): value is Mode {
    if (value && value.Name && value.Description) return true;

    return false;
  }
}