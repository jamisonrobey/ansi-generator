import React from "react";
import Link from "next/link";
import { ANSIOptions, ANSI_COLOR_MAP } from "../lib/ansiConstants";

export const MockTerminal: React.FC<ANSIOptions> = ({
  foreground,
  background,
  style,
  escapeSequence,
}) => {
  const textColor = ANSI_COLOR_MAP[foreground] || "inherit";
  const backgroundColor = ANSI_COLOR_MAP[background] || "transparent";
  const fontWeight = style === "1" ? "bold" : "normal";
  const textDecoration = style === "4" ? "underline" : "none";

  const ansiCode = `${escapeSequence}[${style};${foreground};${background}m`;

  return (
    <div className="flex flex-col border border-gray-300 dark:border-gray-800 p-2 rounded-md">
      <div className="flex items-center space-x-3">
        <span className="w-4 h-4 rounded-full bg-[#fd5f57]" />
        <span className="w-4 h-4 rounded-full bg-[#fdba2e]" />
        <span className="w-4 h-4 rounded-full bg-[#2bc840]" />
      </div>
      <div className="my-4">
        <p className="font-mono py-1">
          <Link
            href="https://github.com/jamisonrobey"
            className="hover:underline"
          >
            jamison
          </Link>
          @ansi:$ echo '{ansiCode}Hello, World!'
        </p>
        <p
          className="font-mono py-1"
          style={{
            color: textColor,
            backgroundColor,
            fontWeight,
            textDecoration,
          }}
        >
          Hello, World!
        </p>
      </div>
    </div>
  );
};
