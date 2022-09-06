/** The type of domain */
export type DomainType = "any" | "armor" | "feet" | "hand" | "head" | "leg" | "torso";

export namespace DomainType {
  export function parse(text: string): DomainType {
    switch (text) {
      case "any":
      case "armor":
      case "feet":
      case "hand":
      case "head":
      case "leg":
      case "torso":
        return text;

      default:
        return "any";
    }
  }
}
