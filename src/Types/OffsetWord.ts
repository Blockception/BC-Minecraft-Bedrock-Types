/** */
export interface OffsetWord {
  /** */
  text: string;
  /** */
  offset: number;
}

/**
 *
 */
export namespace OffsetWord {
  /**
   *
   * @param text
   * @param number
   * @returns
   */
  export function create(text: string, number: number = 0): OffsetWord {
    return { text: text, offset: number };
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  export function is(value: any): value is OffsetWord {
    if (typeof value === "object" && typeof value.text === "string" && typeof value.offset === "number") return true;

    return false;
  }
}
