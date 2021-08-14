export namespace Json {
  /**
   *
   * @param value
   * @returns
   */
  export function isObject(value: string): boolean {
    if (value.startsWith("{") && value.endsWith("}")) return true;

    return false;
  }

  /**
   *
   * @param value
   * @returns
   */
  export function isArray(value: string): boolean {
    if (value.startsWith("[") && value.endsWith("]")) return true;

    return false;
  }
}
