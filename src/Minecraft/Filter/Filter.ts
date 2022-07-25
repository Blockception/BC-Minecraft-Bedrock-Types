import { DomainType } from "./Domain";
import { TestType } from "./TestType";
import { OperatorType } from "./Operator";
import { SubjectType } from "./Subject";

/**
 *
 */
export interface Filter {
  /**
   *
   */
  test: TestType;
  /**
   *
   */
  subject?: SubjectType;
  /**
   *
   */
  operator?: OperatorType;
  /**
   *
   */
  domain?: DomainType;
  /**
   *
   */
  value?: string | boolean | number;
}

export interface FilterContainerType {
  any_of?: FilterItemType;
  all_of?: FilterItemType;
  none_of?: FilterItemType;
}

export type FilterType = FilterItemType | FilterItemType[];
export type FilterItemType = FilterContainerType | Filter;

/**
 *
 */
export namespace Filter {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Filter {
    if (typeof value === "object") {
      return typeof value.test === "string";
    }

    return false;
  }

  export function forEach(item: FilterType, callback: (item: Filter) => void) {
    if (Array.isArray(item)) {
      return item.forEach((i) => forEach(i, callback));
    }

    if (typeof item !== "object") return;

    if (Filter.is(item)) {
      callback(item);
    }

    item = item as FilterContainerType;
    if (item.any_of) forEach(item.any_of, callback);
    if (item.all_of) forEach(item.all_of, callback);
    if (item.none_of) forEach(item.none_of, callback);
  }
}
