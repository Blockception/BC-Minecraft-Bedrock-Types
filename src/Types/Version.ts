/**
 * 
 */
export interface Version {
  /**
   * 
   */
  major: number,
  /**
   * 
   */
  minor: number,
  /**
   * 
   */
  patch: number
}

/**
 * 
 */
export namespace Version {
  /**
   * 
   * @param value 
   * @returns 
   */
  export function is(value: any): value is Version {
    if (typeof value === "object") {
      if (typeof value.major !== "number") return false;
      if (typeof value.minor !== "number") return false;
      if (typeof value.patch !== "number") return false;

      return true;
    }

    return false;
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  export function parse(value: string): Version {
    const out: Version = {
      major: 0,
      minor: 0,
      patch: 0
    }

    const p = value.split('.');

    switch (p.length) {
      default:
      case 3:
        out.patch = Number.parseInt(p[2]);

      case 2:
        out.minor = Number.parseInt(p[1]);

      case 1:
        out.major = Number.parseInt(p[0]);

      case 0:
        break;
    }

    return out;
  }

  export function fromArray(version: number[]): Version {
    const out: Version = {
      major: 0,
      minor: 0,
      patch: 0
    }

    switch (version.length) {
      default:
      case 3:
        out.patch = version[2];

      case 2:
        out.minor = version[1];

      case 1:
        out.major = version[0];

      case 0:
        break;
    }

    return out;
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  export function toString(value: Version): string {
    return `${value.major}.${value.minor}.${value.patch}`;
  }

  /**Compares A to B, returns 1 if A is greater then B, returns -1 if B is greater then A, returns 0 if equal
   * @param a 
   * @param b 
   */
  export function compare(a: Version | string | number[], b: Version | string | number[]): number {
    if (typeof a === "string") { a = Version.parse(a); }
    else if (Array.isArray(a)) { a = Version.fromArray(a); }

    if (typeof b === "string") { b = Version.parse(b); }
    else if (Array.isArray(b)) { b = Version.fromArray(b); }

    let r: number;
    if ((r = Math.sign(a.major - b.major)) !== 0) return r;
    if ((r = Math.sign(a.minor - b.minor)) !== 0) return r;

    return Math.sign(a.patch - b.patch);
  }
}