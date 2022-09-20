export function findCommaOrEnd(text: string): number {
  let index = 0;
  let depth = 0;
  let instr = false;

  while (index < text.length) {
    const c = text.charAt(index);

    if (instr) {
      if (c === '"' && text.charAt(index - 1) !== "\\") {
        instr = false;
      }
    } else if (c === '"') {
      instr = true;
    } else {
      switch (c) {
        case "[":
        case "{":
        case "(":
          depth++;
          break;
        case "]":
        case "}":
        case ")":
          depth--;
          break;
        case ",":
          if (depth === 0) {
            return index;
          }
      }
    }

    index++;
  }

  return text.length;
}
