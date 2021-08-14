/**
 *
 */
export namespace Float {
  export const pattern = /^[\-\.\d]*$/;

  /**
   *
   * @param text
   * @returns
   */
  export function is(text: string): boolean {
    return pattern.test(text);
  }
}
