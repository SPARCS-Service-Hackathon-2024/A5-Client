import { atom } from "recoil";
export const mapState = atom({
  key: "mapState",
  default: {
    loading: true,
    data: null,
    center: {
      lat: 37.5878109,
      lng: 127.0017424,
    },
    locked: true,
    location: "",
    addressInput: "",
    radius: 1000,
  },
});

export const addressInputState = atom({
  key: "addressInputState",
  default: "",
});

export const sliderState = atom({
  key: "sliderState",
  default: {
    menu: "주변 산책로",
  },
});
