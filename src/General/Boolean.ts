/**
 *
 */
export namespace Boolean {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: string): boolean {
    switch (value) {
      case "True":
      case "true":
      case "False":
      case "false":
        return true;

      default:
        return false;
    }
  }

  /**
   *
   * @param value
   * @returns
   */
  export function parse(value: string): boolean {
    switch (value) {
      case "True":
      case "true":
      case "1":
        return true;

      default:
        return false;
    }
  }
}
