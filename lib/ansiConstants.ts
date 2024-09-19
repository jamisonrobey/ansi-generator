export type ANSIOption =
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "39" // foreground colors
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46"
  | "47"
  | "49" // background colors
  | "0"
  | "1"
  | "4" // styles
  | "\\x1b"
  | "\\033"
  | "\\e"; // escape sequences

export interface ANSIOptions {
  foreground: ANSIOption;
  background: ANSIOption;
  style: ANSIOption;
  escapeSequence: ANSIOption;
}

export const colors = [
  "Default",
  "Black",
  "Red",
  "Green",
  "Yellow",
  "Blue",
  "Magenta",
  "Cyan",
  "White",
];

export const styles = ["Normal", "Bold", "Underline"];
export const escapeSequences = ["\\x1b", "\\033", "\\e"];

export const colorToANSI: Record<string, ANSIOption> = {
  Default: "39",
  Black: "30",
  Red: "31",
  Green: "32",
  Yellow: "33",
  Blue: "34",
  Magenta: "35",
  Cyan: "36",
  White: "37",
};

export const bgColorToANSI: Record<string, ANSIOption> = {
  Default: "49",
  Black: "40",
  Red: "41",
  Green: "42",
  Yellow: "43",
  Blue: "44",
  Magenta: "45",
  Cyan: "46",
  White: "47",
};

export const styleToANSI: Record<string, ANSIOption> = {
  Normal: "0",
  Bold: "1",
  Underline: "4",
};

export const ANSI_COLOR_MAP: Record<string, string> = {
  "30": "black",
  "31": "red",
  "32": "green",
  "33": "yellow",
  "34": "blue",
  "35": "magenta",
  "36": "cyan",
  "37": "white",
  "39": "inherit", // Default foreground
  "40": "black",
  "41": "red",
  "42": "green",
  "43": "yellow",
  "44": "blue",
  "45": "magenta",
  "46": "cyan",
  "47": "white",
  "49": "transparent", // Default background
};

export type MappingType = Record<string, ANSIOption>;
