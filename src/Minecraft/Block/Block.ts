import { Documentated, Identifiable, Locatable, Location } from "../../Types/include";

/**
 *
 */
export interface BlockState {
  /** */
  property: string;
  /** */
  value: string;
}

/**
 *
 */
export namespace BlockState {
  /**
   *
   * @param data
   * @returns
   */
  export function parse(data: string): BlockState | undefined {
    const index = data.indexOf("=");

    if (index > -1) {
      const k = data.slice(0, index);
      const v = data.slice(index + 1);

      return { property: k, value: v };
    }

    return undefined;
  }

  /**
   *
   * @param property
   * @param value
   * @returns
   */
  export function create(property: string, value: string) {
    return {
      property: property,
      value: value,
    };
  }
}

/**
 *
 */
export interface Block extends Locatable, Documentated, Identifiable {
  /** */
  states: BlockState[];
}

/**
 *
 */
export namespace Block {
  /**
   *
   * @param id
   * @param Location
   * @returns
   */
  export function create(id: string, Location: Location): Block {
    return {
      id: id,
      states: [],
      location: Location,
    };
  }

  /**
   *
   * @param blockDescription
   * @returns
   */
  export function getId(blockDescription: string): string {
    const index = blockDescription.indexOf("[");

    if (index > -1) {
      return blockDescription.slice(0, index);
    }

    return blockDescription;
  }

  /**
   *
   * @param blockDescription
   * @returns
   */
  export function getStates(blockDescription: string): BlockState[] {
    const out: BlockState[] = [];
    let startindex = blockDescription.indexOf("[");

    if (startindex > -1) {
      startindex++;
      let endindex = blockDescription.indexOf("]", startindex + 1);

      if (endindex < startindex) endindex = blockDescription.length;

      const parts = blockDescription.slice(startindex, endindex).split(",");

      for (var I = 0; I < parts.length; I++) {
        const b = BlockState.parse(parts[I]);
        if (b) out.push(b);
      }
    }

    return out;
  }

  /**
   *
   * @param blockDescription
   */
  export function fromBlockDescriptor(blockDescription: string, Location: Location): Block {
    const out: BlockState[] = [];
    let id: string;
    let startindex = blockDescription.indexOf("[");

    if (startindex > -1) {
      id = blockDescription.slice(0, startindex);
      startindex++;
      let endindex = blockDescription.indexOf("]", startindex + 1);

      if (endindex < startindex) endindex = blockDescription.length;

      const parts = blockDescription.slice(startindex, endindex).split(",");

      for (var I = 0; I < parts.length; I++) {
        const b = BlockState.parse(parts[I]);
        if (b) out.push(b);
      }
    } else {
      id = blockDescription;
    }

    const block = Block.create(id, Location);
    block.states = out;

    return block;
  }
}
