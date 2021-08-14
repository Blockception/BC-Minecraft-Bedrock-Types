/**An object that carries documentation in markdown format*/
export interface Documentated {
  /**The field that stores the documentation*/
  documentation?: string;
}

/**The namespace for the documentated object*/
export namespace Documentated {
  /**Checks if the given object implements Documentated interface
   * @param value
   * @returns
   */
  export function is(value: any): value is Documentated {
    if (value && typeof value.documentation === "string") {
      return true;
    }

    return false;
  }
}
