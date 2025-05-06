export type ANSIEscapeSequence = "\\x1b" | "\\033" | "\\e";

export type ANSIStyleCode =
  | "0" // normal
  | "1" // bold
  | "2" // faint
  | "3" // italic
  | "4" // underline
  | "5" // slow Blink
  | "7" // inverse
  | "8" // conceal / hidden
  | "9"; // strikethrough

export interface ANSIOptions {
  foregroundSgr: string;
  backgroundSgr: string;
  styleSgr: string;
  escapeSequence: ANSIEscapeSequence;
}

export const DEFAULT_ANSI_OPTIONS: ANSIOptions = {
  foregroundSgr: "39",
  backgroundSgr: "49",
  styleSgr: "0",
  escapeSequence: "\\x1b",
};

export const BASIC_COLOR_LABELS = [
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
export const BRIGHT_COLOR_LABELS = [
  "Bright Black",
  "Bright Red",
  "Bright Green",
  "Bright Yellow",
  "Bright Blue",
  "Bright Magenta",
  "Bright Cyan",
  "Bright White",
];

export const STYLE_LABELS: { label: string; code: ANSIStyleCode }[] = [
  { label: "Normal", code: "0" },
  { label: "Bold", code: "1" },
  { label: "Faint", code: "2" },
  { label: "Italic", code: "3" },
  { label: "Underline", code: "4" },
  { label: "Slow Blink", code: "5" },
  { label: "Inverse", code: "7" },
  { label: "Hidden", code: "8" },
  { label: "Strikethrough", code: "9" },
];

export const ESCAPE_SEQUENCE_LABELS: ANSIEscapeSequence[] = [
  "\\x1b",
  "\\033",
  "\\e",
];

export const FG_COLOR_TO_SGR_PART: Record<string, string> = {
  Default: "39",
  Black: "30",
  Red: "31",
  Green: "32",
  Yellow: "33",
  Blue: "34",
  Magenta: "35",
  Cyan: "36",
  White: "37",
  "Bright Black": "90",
  "Bright Red": "91",
  "Bright Green": "92",
  "Bright Yellow": "93",
  "Bright Blue": "94",
  "Bright Magenta": "95",
  "Bright Cyan": "96",
  "Bright White": "97",
};

export const BG_COLOR_TO_SGR_PART: Record<string, string> = {
  Default: "49",
  Black: "40",
  Red: "41",
  Green: "42",
  Yellow: "43",
  Blue: "44",
  Magenta: "45",
  Cyan: "46",
  White: "47",
  "Bright Black": "100",
  "Bright Red": "101",
  "Bright Green": "102",
  "Bright Yellow": "103",
  "Bright Blue": "104",
  "Bright Magenta": "105",
  "Bright Cyan": "106",
  "Bright White": "107",
};

export const STYLE_CODE_TO_LABEL = Object.fromEntries(
  STYLE_LABELS.map((s) => [s.code, s.label])
);

const colorCssMap: Record<string, string> = {
  "30": "black",
  "31": "#AA0000",
  "32": "#00AA00",
  "33": "#AA5500",
  "34": "#0000AA",
  "35": "#AA00AA",
  "36": "#00AAAA",
  "37": "#AAAAAA",
  "39": "inherit", // default FG
  "90": "#555555",
  "91": "#FF5555",
  "92": "#55FF55",
  "93": "#FFFF55",
  "94": "#5555FF",
  "95": "#FF55FF",
  "96": "#55FFFF",
  "97": "white",

  "40": "black",
  "41": "#AA0000",
  "42": "#00AA00",
  "43": "#AA5500",
  "44": "#0000AA",
  "45": "#AA00AA",
  "46": "#00AAAA",
  "47": "#AAAAAA",
  "49": "transparent", // default BG
  "100": "#555555",
  "101": "#FF5555",
  "102": "#55FF55",
  "103": "#FFFF55",
  "104": "#5555FF",
  "105": "#FF55FF",
  "106": "#55FFFF",
  "107": "white",
};

function get256ColorCss(code: number): string {
  if (code >= 0 && code <= 7) return colorCssMap[(code + 30).toString()]; // standard colors
  if (code >= 8 && code <= 15) return colorCssMap[(code - 8 + 90).toString()]; // bright colors
  if (code >= 16 && code <= 231) {
    const rCode = Math.floor((code - 16) / 36);
    const gCode = Math.floor(((code - 16) % 36) / 6);
    const bCode = (code - 16) % 6;
    const r = rCode === 0 ? 0 : rCode * 40 + 55;
    const g = gCode === 0 ? 0 : gCode * 40 + 55;
    const b = bCode === 0 ? 0 : bCode * 40 + 55;
    return `rgb(${r},${g},${b})`;
  }
  if (code >= 232 && code <= 255) {
    const gray = (code - 232) * 10 + 8;
    return `rgb(${gray},${gray},${gray})`;
  }
  return "inherit"; // base case
}

export function sgrToCss(sgrParam: string, isBackground: boolean): string {
  if (!sgrParam) return isBackground ? "transparent" : "inherit";

  const defaultColor = isBackground ? "transparent" : "inherit";
  const parts = sgrParam.split(";");

  if (parts[0] === (isBackground ? "49" : "39")) return defaultColor;
  if (parts[0] === (isBackground ? "48" : "38")) {
    // extended colors
    if (parts[1] === "5" && parts[2]) {
      // 256 colors
      return get256ColorCss(parseInt(parts[2], 10));
    }
    if (parts[1] === "2" && parts[2] && parts[3] && parts[4]) {
      // RGB
      return `rgb(${parts[2]},${parts[3]},${parts[4]})`;
    }
  }
  // basic and Bright colors
  return colorCssMap[sgrParam] || defaultColor;
}
