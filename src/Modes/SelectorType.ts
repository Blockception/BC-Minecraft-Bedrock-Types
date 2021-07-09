import { ModeCollection } from './ModeCollection';

export const SelectorTypeMode: ModeCollection = {
  name: "selector Type mode",
  modes: [
    { name: "@a", documentation: "Targets all players" },
    { name: "@e", documentation: "Targets all entities" },
    { name: "@s", documentation: "Targets the executing entity" },
    { name: "@r", documentation: "Targets random players, or if specified, random types" },
    { name: "@p", documentation: "Targets the nearest player" },
    
    { name: "@c", documentation: "Targets the executing players agent", eduOnly:true },
    { name: "@v",documentation: "Targets all agents", eduOnly:true },
    { name: "@initiator", documentation: "Target the initiating entity", eduOnly:true },
  ],
};