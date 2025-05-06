export type ANSIForegroundColor =
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "39";
export type ANSIBackgroundColor =
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46"
  | "47"
  | "49";
export type ANSIStyle = "0" | "1" | "4";
export type ANSIEscapeSequence = "\\x1b" | "\\033" | "\\e";

export type ANSIOption =
  | ANSIForegroundColor
  | ANSIBackgroundColor
  | ANSIStyle
  | ANSIEscapeSequence;

export interface ANSIOptions {
  foreground: ANSIForegroundColor;
  background: ANSIBackgroundColor;
  style: ANSIStyle;
  escapeSequence: ANSIEscapeSequence;
}

export const DEFAULT_ANSI_OPTIONS: ANSIOptions = {
  foreground: "39",
  background: "49",
  style: "0",
  escapeSequence: "\\x1b",
};

export const COLOR_LABELS = [
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

export const STYLE_LABELS = ["Normal", "Bold", "Underline"];

export const ESCAPE_SEQUENCE_LABELS = ["\\x1b", "\\033", "\\e"];

export const COLOR_TO_ANSI: Record<string, ANSIForegroundColor> = {
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

export const BG_COLOR_TO_ANSI: Record<string, ANSIBackgroundColor> = {
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

export const STYLE_TO_ANSI: Record<string, ANSIStyle> = {
  Normal: "0",
  Bold: "1",
  Underline: "4",
};

export const ESCAPE_SEQUENCE_MAP: Record<string, ANSIEscapeSequence> = {
  "\\x1b": "\\x1b",
  "\\033": "\\033",
  "\\e": "\\e",
};

export const ANSI_TO_CSS_COLOR: Record<string, string> = {
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

export const ANSI_TO_COLOR_LABEL = Object.fromEntries(
  Object.entries(COLOR_TO_ANSI).map(([k, v]) => [v, k])
);

export const ANSI_TO_BG_COLOR_LABEL = Object.fromEntries(
  Object.entries(BG_COLOR_TO_ANSI).map(([k, v]) => [v, k])
);

export const ANSI_TO_STYLE_LABEL = Object.fromEntries(
  Object.entries(STYLE_TO_ANSI).map(([k, v]) => [v, k])
);
