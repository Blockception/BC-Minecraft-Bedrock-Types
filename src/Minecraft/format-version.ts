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
    let parts = data.split(".");
    let major: number, minor: number, patch: number;

    major = parseInt(parts[0] ?? "0");
    minor = parseInt(parts[1] ?? "0");
    patch = parseInt(parts[2] ?? "0");

    return [major, minor, patch];
  }
}
