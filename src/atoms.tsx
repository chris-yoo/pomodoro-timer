import { atom } from "recoil";

export const countState = atom({
  key: "count",
  default: 0,
});

export const timerState = atom({
  key: "remainTime",
  default: 10,
});

export const toggleState = atom({
  key: "toggle",
  default: false,
});
