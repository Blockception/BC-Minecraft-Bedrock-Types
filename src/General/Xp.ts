export namespace XP {
  export const pattern = /^([\-\d]*|[\-\d]*[Ll])$/;

  /**
   *
   * @param text
   * @returns
   */
  export function is(text: string): boolean {
    return pattern.test(text);
  }
}
