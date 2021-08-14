import { ModeCollection } from "./ModeCollection";

export const TeleportRulesMode: ModeCollection = {
  name: "Teleport Rules Mode",
  modes: [
    { name: "teleport_ride", documentation: "Teleports the ride to the rider" },
    { name: "teleport_rider", documentation: "Teleports the rider to the ride" },
  ],
};
