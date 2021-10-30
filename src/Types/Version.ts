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
  export function compare(a: Version | string, b: Version | string): number {
    if (typeof a === "string") a = Version.parse(a);
    if (typeof b === "string") b = Version.parse(b);

    let r: number;
    if ((r = Math.sign(a.major - b.major)) !== 0) return r;
    if ((r = Math.sign(a.minor - b.minor)) !== 0) return r;

    return Math.sign(a.patch - b.patch);
  }
}