import { ModeCollection } from "./ModeCollection";



/**The namespace that delivers hard references*/
export namespace InternalSelectorTypeMode {
  /** */
  export const AllPlayers = { name: "@a", documentation: "Targets all players" };
  /** */
  export const AllEntities = { name: "@e", documentation: "Targets all entities" };
  /** */
  export const Random = { name: "@r", documentation: "Targets random players, or if specified, random types" };
  /** */
  export const Nearest = { name: "@p", documentation: "Targets the nearest player" };
  /** */
  export const Initiator = { name: "@initiator", documentation: "Target the initiating entity" };
  /** */
  export const Agents = { name: "@c", documentation: "Targets the executing players agent", eduOnly: true };
  /** */
  export const AllAgents = { name: "@v", documentation: "Targets all agents", eduOnly: true };
}

/** */
export const SelectorTypeMode: ModeCollection = {
  name: "selector Type",
  modes: [
    InternalSelectorTypeMode.Agents,
    InternalSelectorTypeMode.AllAgents,
    InternalSelectorTypeMode.AllEntities,
    InternalSelectorTypeMode.AllPlayers,
    InternalSelectorTypeMode.Initiator,
    InternalSelectorTypeMode.Nearest,
    InternalSelectorTypeMode.Random,
  ],
};