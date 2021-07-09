/** The interface that marks a gamemode*/
export interface ModeCollection {
  /**The collection of different modes*/
  modes: Mode[];
  /**The name of the collection*/
  name: string;
}

/** The mode interface */
export interface Mode {
  /**The name of this mode*/
  name: string;
  /**The documentation of this mode*/
  documentation: string;
  /** */
  eduOnly? : boolean;
}

export namespace ModeCollection {
  /** */
  export function is(value: any): value is ModeCollection {
    if (value) {
      let temp = value as ModeCollection;

      if (temp.name && temp.modes && Array.isArray(value.modes)) return true;
    }

    return false;
  }

  /**
   * 
   */
  export function isValue(Collection : ModeCollection, value : string) : boolean {
    const M = Collection.modes;

    for (var I = 0; I < M.length; I++) {
      const elemt = M[I];

      if (elemt.name === value) return true;
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
      const M = Collection.modes;

      for (var I = 0; I < M.length; I++) {
        const elemt = M[I];
  
        if (elemt.name === index) return elemt;
      }
    }
    else {
      return Collection.modes[index];
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
    if (value && value.name && value.documentation) return true;

    return false;
  }
}