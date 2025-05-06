import Link from "next/link";
import { ANSIOptions, sgrToCss, STYLE_CODE_TO_LABEL } from "../lib/ansiTypes";
import React from "react";

export const MockTerminal: React.FC<ANSIOptions> = ({
  foregroundSgr,
  backgroundSgr,
  styleSgr,
  escapeSequence,
}) => {
  let finalCssColor = sgrToCss(foregroundSgr, false);
  let finalCssBgColor = sgrToCss(backgroundSgr, true);

  const styles: React.CSSProperties = {};
  const activeStyleCodes = styleSgr ? styleSgr.split(";") : ["0"];

  if (activeStyleCodes.includes("0")) {
    styles.fontWeight = "normal";
    styles.fontStyle = "normal";
    styles.textDecoration = "none";
    styles.opacity = 1;
    styles.visibility = "visible";
  }

  const textDecorations: string[] = [];
  activeStyleCodes.forEach((code) => {
    switch (code) {
      case "1":
        styles.fontWeight = "bold";
        break;
      case "2":
        styles.opacity = 0.7;
        break; // faint
      case "3":
        styles.fontStyle = "italic";
        break;
      case "4":
        textDecorations.push("underline");
        break;
      case "5":
        styles.animation = "ansi-blink 1s step-end infinite";
        break; // blink
      // case "7": // inverse handled below by swapping colors
      case "8":
        styles.visibility = "hidden";
        break; // conceal
      case "9":
        textDecorations.push("line-through");
        break;
    }
  });

  if (textDecorations.length > 0) {
    styles.textDecoration = textDecorations.join(" ");
  }

  // inverse for 7
  if (activeStyleCodes.includes("7")) {
    [finalCssColor, finalCssBgColor] = [finalCssBgColor, finalCssColor];
    if (finalCssColor === "transparent") finalCssColor = "inherit";
    if (finalCssBgColor === "inherit") finalCssBgColor = "transparent";
  }

  styles.color = finalCssColor;
  styles.backgroundColor = finalCssBgColor;

  const sgrParams = [styleSgr, foregroundSgr, backgroundSgr]
    .filter((p) => p !== null && p !== undefined && p !== "")
    .join(";");
  const ansiCodeToDisplay = `${escapeSequence}[${sgrParams || "0"}m`;

  return (
    <div className="flex flex-col border border-gray-300 dark:border-gray-800 p-2 rounded-md">
      <style jsx global>{`
        @keyframes ansi-blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
      <div className="flex items-center space-x-3">
        <span className="w-4 h-4 rounded-full bg-[#fd5f57]" />
        <span className="w-4 h-4 rounded-full bg-[#fdba2e]" />
        <span className="w-4 h-4 rounded-full bg-[#2bc840]" />
      </div>
      <div className="my-4">
        <p className="font-mono py-1 text-sm overflow-x-auto whitespace-nowrap">
          <Link
            href="https://github.com/jamisonrobey"
            className="hover:underline"
            aria-label="View jamisonrobey(author) on GitHub"
          >
            jamison
          </Link>
          @ansi:$ echo -e '{ansiCodeToDisplay}Hello, World!{escapeSequence}[0m'
        </p>
        <p className="font-mono py-1" style={styles}>
          Hello, World!
        </p>
      </div>
    </div>
  );
};
