import { ModeCollection } from "./ModeCollection";

export const CameraShakeMode: ModeCollection = {
  Name: "Camera Shake Modes",
  Modes: [
    { Name: "positional", Description: "Shakes the camera using relatives position" },
    { Name: "rotational", Description: "Shakes the camera using rotations" },
  ],
};
