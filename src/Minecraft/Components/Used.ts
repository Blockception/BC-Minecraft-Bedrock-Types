import { ComponentBehavior } from "./Interfaces";

export function getUsedComponents(data: ComponentBehavior): string[] {
  const out: string[] = [];

  if (data.components) {
    Object.getOwnPropertyNames(data.components).forEach((c) => {
      if (!out.includes(c)) out.push(c);
    });
  }

  const groups = data.component_groups;

  if (groups) {
    Object.entries(groups).forEach(([name, group]) => {
      Object.getOwnPropertyNames(group).forEach((c) => {
        if (!out.includes(c)) out.push(c);
      });
    });
  }

  return out;
}

export function getUsedGroups(data: ComponentBehavior): string[] {
  const groups = data.component_groups;

  if (groups) {
    return Object.getOwnPropertyNames(groups);
  }

  return [];
}

/**
 *
 * @param entity
 * @param group
 * @returns
 */
export function hasGroup(data: ComponentBehavior, group: string): boolean {
  if (data.component_groups) {
    if (data.component_groups[group]) {
      return true;
    }
  }

  return false;
}
