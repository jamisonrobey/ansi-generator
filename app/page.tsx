"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaRedo, FaGithub } from "react-icons/fa";
import { IconButton } from "@/components/ui/IconButton";
import { OptionGroup } from "@/components/ui/OptionGroup";
import { MockTerminal } from "@/components/MockTerminal";
import {
  ANSIOptions,
  colors,
  styles,
  escapeSequences,
  colorToANSI,
  bgColorToANSI,
  styleToANSI,
  MappingType,
} from "@/lib/ansiConstants";

export default function Home() {
  const [ansiOptions, setAnsiOptions] = useState<ANSIOptions>({
    foreground: "39",
    background: "49",
    style: "0",
    escapeSequence: "\\x1b",
  });
  const [copied, setCopied] = useState(false);

  const updateOption = (key: keyof ANSIOptions, value: string) => {
    const mappings = {
      foreground: colorToANSI,
      background: bgColorToANSI,
      style: styleToANSI,
      escapeSequence: {
        "\\x1b": "\\x1b",
        "\\033": "\\033",
        "\\e": "\\e",
      } as MappingType,
    };
    const ansiValue = mappings[key][value];
    if (ansiValue) {
      setAnsiOptions((prev) => ({ ...prev, [key]: ansiValue }));
    }
  };

  const getSelectedOption = (key: keyof ANSIOptions): string => {
    const value = ansiOptions[key];

    if (key === "escapeSequence") {
      return value;
    }

    if (key === "style") {
      return (
        Object.keys(styleToANSI).find((k) => styleToANSI[k] === value) ||
        "Normal"
      );
    }

    const reverseMap = Object.fromEntries(
      Object.entries(key === "background" ? bgColorToANSI : colorToANSI).map(
        ([k, v]) => [v, k]
      )
    );
    return reverseMap[value] || value;
  };

  const handleRefresh = () => {
    setAnsiOptions({
      foreground: "39",
      background: "49",
      style: "0",
      escapeSequence: "\\x1b",
    });
  };

  const getFullAnsiCode = () => {
    return `${ansiOptions.escapeSequence}[${ansiOptions.style};${ansiOptions.foreground};${ansiOptions.background}m`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullAnsiCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center flex-col max-w-4xl mx-auto">
      <h1 className="text-3xl mb-8">
        <Link
          href="https://en.wikipedia.org/wiki/ANSI_escape_code"
          className="hover:underline"
          aria-label="Learn more about ANSI escape codes on Wikipedia"
        >
          ANSI{" "}
        </Link>
        Escape Code Generator
      </h1>
      <div className="mb-8">
        <IconButton icon={FaRedo} text="Refresh" onClick={handleRefresh} />
      </div>
      <div className="space-y-4 w-full">
        <OptionGroup
          label="Foreground Color:"
          options={colors}
          selectedOption={getSelectedOption("foreground")}
          updateOption={(value) => updateOption("foreground", value)}
        />
        <OptionGroup
          label="Background Color:"
          options={colors}
          selectedOption={getSelectedOption("background")}
          updateOption={(value) => updateOption("background", value)}
        />
        <OptionGroup
          label="Style:"
          options={styles}
          selectedOption={getSelectedOption("style")}
          updateOption={(value) => updateOption("style", value)}
        />
        <OptionGroup
          label="Escape sequence:"
          options={escapeSequences}
          selectedOption={ansiOptions.escapeSequence}
          updateOption={(value) => updateOption("escapeSequence", value)}
        />
        <div className="cursor-pointer p-4 text-center" onClick={handleCopy}>
          <p className="font-mono mb-2">{getFullAnsiCode()}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {copied ? "Copied!" : "Click to copy"}
          </p>
        </div>
        <div className="pb-8 w-full">
          <MockTerminal {...ansiOptions} />
        </div>
      </div>
      <Link
        href="https://github.com/jamisonrobey/ansi-generator"
        aria-label="View ANSI Generator source code on GitHub"
      >
        <FaGithub className="w-8 h-8" />
      </Link>
    </div>
  );
}
