import { Size } from "@app/types";

export const parseSize = (size: Size) => {
  if (typeof size === "number") {
    return `${100 * size}%`;
  } else {
    return size;
  }
};