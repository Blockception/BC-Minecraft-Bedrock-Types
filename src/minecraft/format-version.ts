/**
 * The format version of the given minecraft bedrock edition version.
 */
export type FormatVersion = `${string}.${string}.${string}` | `${string}.${string}`;

/**
 * Parses the given data into a format version.
 */
export namespace FormatVersion {
  /**
   * Parses the given data into a format version.
   * @param data The data to parse.
   * @returns The parsed format version.
   */
  export function parse(data: string): [number, number, number] {
    const parts = data.split(".");

    const major = parseInt(parts[0] ?? "0");
    const minor = parseInt(parts[1] ?? "0");
    const patch = parseInt(parts[2] ?? "0");

    return [major, minor, patch];
  }

  export function isEqual(a: [number, number, number], b: [number, number, number]) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }

  export function isLessThan(a: [number, number, number], b: [number, number, number]) {
    for (let i = 0; i < 3; i++) {
      if (a[i] < b[i]) return true;
      if (a[i] > b[i]) return false;
    }
    return false;
  }
}
