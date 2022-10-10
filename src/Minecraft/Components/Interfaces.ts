export type Component = any;
export type ComponentContainer = Record<string, Component>;
export type ComponentGroups = Record<string, ComponentContainer>;


export interface ComponentBehavior {
  component_groups?: ComponentGroups;
  components?: ComponentContainer;
}

