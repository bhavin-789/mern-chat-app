import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",
  "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
  "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
];
export const getColor = (color: any) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  } else {
    return colors[0]; // Fallback to the first color if out of range Buy Premium to See More
  }
};

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
