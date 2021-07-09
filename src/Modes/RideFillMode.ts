import { ModeCollection } from "./ModeCollection";

export const RideFillMode: ModeCollection = {
  name: "Ride Fill Mode",
  modes: [
    { name: "if_group_fits", documentation: "If the entity fits then its placed" },
    { name: "until_full", documentation: "Keep adding entities until full" },
  ],
};
