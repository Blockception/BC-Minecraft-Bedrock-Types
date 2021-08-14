/** */
export interface Position {
  /** */
  line: number;
  /** */
  character: number;
}

/** */
export namespace Position {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Position {
    if (value && typeof value.line === "number" && value.character === "number") return true;

    return false;
  }

  /**
   *
   * @param line
   * @param character
   * @returns
   */
  export function create(line: number = 0, character: number = 0): Position {
    return { line: line, character: character };
  }

  const NewLine = "\n".charCodeAt(0);

  /**Converts the position to an offset
   * @param P
   * @param text
   * @returns
   */
  export function toOffset(P: Position, text: string | { offsetAt(position: Position): number }): number {
    if (typeof text === "object") return text.offsetAt(P);

    //Line count
    let count = 0;
    //Offset of the last newline found
    let Index = 0;

    for (var I = 0; I < text.length; I++) {
      const c = text.charCodeAt(I);

      if (c == NewLine) {
        count++;
        Index = I;

        if (count >= P.line) {
          return Index + P.character;
        }
      }
    }

    return P.character;
  }

  export function toPosition(offset: number, text: string | { positionAt(offset: number): Position }): Position {
    if (typeof text === "object") return text.positionAt(offset);

    //Line count
    let count = 0;
    //Offset of the last newline found
    let Index = 0;

    for (var I = 0; I < offset; I++) {
      const c = text.charCodeAt(I);

      if (c == NewLine) {
        count++;
        Index = I;
      }
    }

    return Position.create(count, offset - Index);
  }
}
