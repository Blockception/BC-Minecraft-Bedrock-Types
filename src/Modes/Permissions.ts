import { ModeCollection } from "./ModeCollection";

/** */
export const PermissionMode: ModeCollection = {
  name: "Permission",
  modes: [
    { name: "camera", documentation: "The permission that enables/disables the player can use the camera view" },
    { name: "movement", documentation: "The permission that enables/disables the players movement." },
  ],
};

export const PermissionStateMode: ModeCollection = {
  name: "Permission State",
  modes: [
    { name: "enabled", documentation: "Enables the permission" },
    { name: "disabled", documentation: "Disables the permission" },
  ],
};