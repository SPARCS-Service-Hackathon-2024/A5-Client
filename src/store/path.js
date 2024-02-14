import { atom } from "recoil";
export const pathState = atom({
  key: "pathState",
  default: [
    { lat: 36.376626341108, lng: 127.38719915966 },
    { lat: 36.376726298399, lng: 127.38710083028 },
    { lat: 36.376700125842, lng: 127.38689307368 },
  ],
});
