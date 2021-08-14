export namespace Coordinate {
  export const pattern = /^[\~\^\+\-\d][\+\-\.\d]*$/;

  /**
   *
   * @param text
   * @returns
   */
  export function is(text: string): boolean {
    return pattern.test(text) !== undefined;
  }
}
