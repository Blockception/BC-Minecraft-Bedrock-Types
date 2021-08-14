export namespace String {
  export function is(value: string): boolean {
    if (value.includes(" ")) {
      if (value.startsWith('"') && value.endsWith('"')) return true;

      return false;
    }

    return true;
  }
}
