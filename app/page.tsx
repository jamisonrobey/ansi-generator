"use client";

import { useState } from "react";
import Link from "next/link";
import { FaRedo, FaGithub } from "react-icons/fa";
import { IconButton } from "@/components/ui/IconButton";
import { OptionGroup } from "@/components/ui/OptionGroup";
import { MockTerminal } from "@/components/MockTerminal";
import {
  ANSIOptions,
  DEFAULT_ANSI_OPTIONS,
  COLOR_LABELS,
  STYLE_LABELS,
  ESCAPE_SEQUENCE_LABELS,
  COLOR_TO_ANSI,
  BG_COLOR_TO_ANSI,
  STYLE_TO_ANSI,
  ESCAPE_SEQUENCE_MAP,
  ANSI_TO_COLOR_LABEL,
  ANSI_TO_BG_COLOR_LABEL,
  ANSI_TO_STYLE_LABEL,
} from "@/lib/ansiTypes";

export default function Home() {
  const [ansiOptions, setAnsiOptions] =
    useState<ANSIOptions>(DEFAULT_ANSI_OPTIONS);
  const [copied, setCopied] = useState(false);

  const updateOption = (key: keyof ANSIOptions, label: string) => {
    let newValue;
    switch (key) {
      case "foreground":
        newValue = COLOR_TO_ANSI[label];
        break;
      case "background":
        newValue = BG_COLOR_TO_ANSI[label];
        break;
      case "style":
        newValue = STYLE_TO_ANSI[label];
        break;
      case "escapeSequence":
        newValue = ESCAPE_SEQUENCE_MAP[label];
        break;
      default:
        return;
    }

    if (newValue) {
      setAnsiOptions((prev) => ({ ...prev, [key]: newValue }));
    }
  };

  const getSelectedLabel = (key: keyof ANSIOptions): string => {
    const value = ansiOptions[key];

    switch (key) {
      case "foreground":
        return ANSI_TO_COLOR_LABEL[value] || "Default";
      case "background":
        return ANSI_TO_BG_COLOR_LABEL[value] || "Default";
      case "style":
        return ANSI_TO_STYLE_LABEL[value] || "Normal";
      case "escapeSequence":
        return value;
      default:
        return "";
    }
  };

  const handleRefresh = () => {
    setAnsiOptions(DEFAULT_ANSI_OPTIONS);
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
    <div className="flex items-center flex-col mx-auto">
      <h1 className="text-3xl mb-8">
        <Link
          href="https://en.wikipedia.org/wiki/ANSI_escape_code"
          className="hover:underline"
          aria-label="Learn more about ANSI codes on Wikipedia"
        >
          ANSI{" "}
        </Link>
        Color Code Generator
      </h1>
      <div className="mb-8">
        <IconButton icon={FaRedo} text="Refresh" onClick={handleRefresh} />
      </div>
      <div className="space-y-4 w-full">
        <OptionGroup
          label="Foreground Color:"
          options={COLOR_LABELS}
          selectedOption={getSelectedLabel("foreground")}
          updateOption={(value) => updateOption("foreground", value)}
        />
        <OptionGroup
          label="Background Color:"
          options={COLOR_LABELS}
          selectedOption={getSelectedLabel("background")}
          updateOption={(value) => updateOption("background", value)}
        />
        <OptionGroup
          label="Style:"
          options={STYLE_LABELS}
          selectedOption={getSelectedLabel("style")}
          updateOption={(value) => updateOption("style", value)}
        />
        <OptionGroup
          label="Escape sequence:"
          options={ESCAPE_SEQUENCE_LABELS}
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
