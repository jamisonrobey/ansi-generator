// File: app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaRedo, FaGithub } from "react-icons/fa";
import { IconButton } from "@/components/ui/IconButton";
import { OptionGroup } from "@/components/ui/OptionGroup";
import { Color256Palette } from "@/components/ui/Color256Palette";
import { RgbColorPicker } from "@/components/ui/RgbColorPicker";
import { MockTerminal } from "@/components/MockTerminal";
import {
  ANSIOptions,
  DEFAULT_ANSI_OPTIONS,
  BASIC_COLOR_LABELS,
  BRIGHT_COLOR_LABELS,
  STYLE_LABELS,
  ESCAPE_SEQUENCE_LABELS,
  FG_COLOR_TO_SGR_PART,
  BG_COLOR_TO_SGR_PART,
  ANSIStyleCode,
  ANSIEscapeSequence,
} from "@/lib/ansiTypes";

type ColorMode = "default" | "basic" | "bright" | "256" | "rgb";

export default function Home() {
  const [ansiOptions, setAnsiOptions] =
    useState<ANSIOptions>(DEFAULT_ANSI_OPTIONS);
  const [copied, setCopied] = useState(false);

  // UI State
  const [fgMode, setFgMode] = useState<ColorMode>("default");
  const [fgBasicColor, setFgBasicColor] = useState<string>("Default");
  const [fgBrightColor, setFgBrightColor] = useState<string>("Default");
  const [fg256Value, setFg256Value] = useState<number>(0);
  const [fgRgb, setFgRgb] = useState({ r: 0, g: 0, b: 0 });

  const [bgMode, setBgMode] = useState<ColorMode>("default");
  const [bgBasicColor, setBgBasicColor] = useState<string>("Default");
  const [bgBrightColor, setBgBrightColor] = useState<string>("Default");
  const [bg256Value, setBg256Value] = useState<number>(0);
  const [bgRgb, setBgRgb] = useState({ r: 0, g: 0, b: 0 });
  const [includeBgInCode, setIncludeBgInCode] = useState(true);

  const [selectedStyleCodes, setSelectedStyleCodes] = useState<ANSIStyleCode[]>(
    ["0"]
  );
  const [currentEscapeSequence, setCurrentEscapeSequence] =
    useState<ANSIEscapeSequence>("\\x1b");

  useEffect(() => {
    let newFgSgr = "39"; // default
    if (fgMode === "basic")
      newFgSgr = FG_COLOR_TO_SGR_PART[fgBasicColor] || "39";
    else if (fgMode === "bright")
      newFgSgr = FG_COLOR_TO_SGR_PART[fgBrightColor] || "39";
    else if (fgMode === "256")
      newFgSgr = `38;5;${Math.max(0, Math.min(255, fg256Value))}`;
    else if (fgMode === "rgb")
      newFgSgr = `38;2;${fgRgb.r};${fgRgb.g};${fgRgb.b}`;

    let newBgSgr = "49"; // default
    if (bgMode === "basic")
      newBgSgr = BG_COLOR_TO_SGR_PART[bgBasicColor] || "49";
    else if (bgMode === "bright")
      newBgSgr = BG_COLOR_TO_SGR_PART[bgBrightColor] || "49";
    else if (bgMode === "256")
      newBgSgr = `48;5;${Math.max(0, Math.min(255, bg256Value))}`;
    else if (bgMode === "rgb")
      newBgSgr = `48;2;${bgRgb.r};${bgRgb.g};${bgRgb.b}`;

    let newStyleSgr =
      selectedStyleCodes.length > 0 ? selectedStyleCodes.join(";") : "0";
    if (selectedStyleCodes.length === 0)
      newStyleSgr = "0"; // normal if no style
    else if (
      selectedStyleCodes.includes("0") &&
      selectedStyleCodes.length > 1
    ) {
      newStyleSgr = "0"; // normal takes precedence
    } else if (
      selectedStyleCodes.length === 1 &&
      selectedStyleCodes[0] === "0"
    ) {
      newStyleSgr = "0";
    }

    setAnsiOptions({
      foregroundSgr: newFgSgr,
      backgroundSgr: newBgSgr,
      styleSgr: newStyleSgr,
      escapeSequence: currentEscapeSequence,
    });
  }, [
    fgMode,
    fgBasicColor,
    fgBrightColor,
    fg256Value,
    fgRgb,
    bgMode,
    bgBasicColor,
    bgBrightColor,
    bg256Value,
    bgRgb,
    selectedStyleCodes,
    currentEscapeSequence,
  ]);

  const handleRefresh = () => {
    setFgMode("default");
    setFgBasicColor("Default");
    setFgBrightColor("Default");
    setFg256Value(0);
    setFgRgb({ r: 0, g: 0, b: 0 });
    setBgMode("default");
    setBgBasicColor("Default");
    setBgBrightColor("Default");
    setBg256Value(0);
    setBgRgb({ r: 0, g: 0, b: 0 });
    setIncludeBgInCode(true);
    setSelectedStyleCodes(["0"]);
    setCurrentEscapeSequence("\\x1b");
  };

  const getFullAnsiCode = () => {
    const params = [
      ansiOptions.styleSgr,
      ansiOptions.foregroundSgr,
      includeBgInCode ? ansiOptions.backgroundSgr : null,
    ]
      .filter((p) => p !== null && p !== undefined && p !== "")
      .join(";");

    return `${ansiOptions.escapeSequence}[${params || "0"}m`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullAnsiCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleStyleToggle = (styleCode: string) => {
    const code = styleCode as ANSIStyleCode;
    if (code === "0") {
      setSelectedStyleCodes(["0"]); // select normal
    } else {
      setSelectedStyleCodes((prev) => {
        const newStyles = prev.includes(code)
          ? prev.filter((s) => s !== code)
          : [...prev.filter((s) => s !== "0"), code]; // remove normal if adding other styles
        return newStyles.length === 0 ? ["0"] : newStyles; // revert normal if empty
      });
    }
  };

  const colorModeOptions = [
    { label: "Default", value: "default" },
    { label: "Basic", value: "basic" },
    { label: "Bright", value: "bright" },
    { label: "256 Color", value: "256" },
    { label: "RGB Color", value: "rgb" },
  ];

  return (
    <div className="flex items-center flex-col mx-auto max-w-3xl w-full">
      <h1 className="text-3xl mb-8 text-center">
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
      <div className="space-y-6 w-full">
        <div className="w-full">
          <MockTerminal {...ansiOptions} />
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">Escape:</span>
            {ESCAPE_SEQUENCE_LABELS.map((seq) => (
              <button
                key={seq}
                onClick={() => setCurrentEscapeSequence(seq)}
                className={`px-2 py-1 text-sm font-mono rounded ${
                  currentEscapeSequence === seq
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {seq}
              </button>
            ))}
          </div>
          <div
            className="cursor-pointer text-center"
            onClick={handleCopy}
          >
            <p className="font-mono text-lg mb-2 break-all">
              {getFullAnsiCode()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {copied ? "Copied!" : "Click to copy"}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-6 w-full mt-6">
        <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Foreground Color</h3>
          <OptionGroup
            label="Mode:"
            options={colorModeOptions}
            selectedValue={fgMode}
            onUpdate={(val) => setFgMode(val as ColorMode)}
          />
          {fgMode === "basic" && (
            <OptionGroup
              label="Color:"
              options={BASIC_COLOR_LABELS.map((c) => ({ label: c, value: c }))}
              selectedValue={fgBasicColor}
              onUpdate={setFgBasicColor}
            />
          )}
          {fgMode === "bright" && (
            <OptionGroup
              label="Color:"
              options={BRIGHT_COLOR_LABELS.map((c) => ({ label: c, value: c }))}
              selectedValue={fgBrightColor}
              onUpdate={setFgBrightColor}
            />
          )}
          {fgMode === "256" && (
            <div className="mt-2">
              <div className="flex items-center">
                <label htmlFor="fg256" className="w-40 flex-shrink-0">
                  Index (0-255):
                </label>
                <input
                  type="number"
                  id="fg256"
                  value={fg256Value}
                  min="0"
                  max="255"
                  onChange={(e) => setFg256Value(parseInt(e.target.value, 10))}
                  className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
              <Color256Palette
                selectedValue={fg256Value}
                onSelect={setFg256Value}
              />
            </div>
          )}
          {fgMode === "rgb" && (
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="w-40 flex-shrink-0">RGB:</div>
              <RgbColorPicker rgb={fgRgb} onChange={setFgRgb} />
              <input
                type="number"
                placeholder="R"
                value={fgRgb.r}
                min="0"
                max="255"
                onChange={(e) =>
                  setFgRgb((p) => ({ ...p, r: parseInt(e.target.value, 10) }))
                }
                className="p-2 border rounded w-20 dark:bg-gray-800 dark:border-gray-600"
              />
              <input
                type="number"
                placeholder="G"
                value={fgRgb.g}
                min="0"
                max="255"
                onChange={(e) =>
                  setFgRgb((p) => ({ ...p, g: parseInt(e.target.value, 10) }))
                }
                className="p-2 border rounded w-20 dark:bg-gray-800 dark:border-gray-600"
              />
              <input
                type="number"
                placeholder="B"
                value={fgRgb.b}
                min="0"
                max="255"
                onChange={(e) =>
                  setFgRgb((p) => ({ ...p, b: parseInt(e.target.value, 10) }))
                }
                className="p-2 border rounded w-20 dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
          )}
        </div>

        <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Background Color</h3>
          <OptionGroup
            label="Mode:"
            options={colorModeOptions}
            selectedValue={bgMode}
            onUpdate={(val) => setBgMode(val as ColorMode)}
          />
          {bgMode === "basic" && (
            <OptionGroup
              label="Color:"
              options={BASIC_COLOR_LABELS.map((c) => ({ label: c, value: c }))}
              selectedValue={bgBasicColor}
              onUpdate={setBgBasicColor}
            />
          )}
          {bgMode === "bright" && (
            <OptionGroup
              label="Color:"
              options={BRIGHT_COLOR_LABELS.map((c) => ({ label: c, value: c }))}
              selectedValue={bgBrightColor}
              onUpdate={setBgBrightColor}
            />
          )}
          {bgMode === "256" && (
            <div className="mt-2">
              <div className="flex items-center">
                <label htmlFor="bg256" className="w-40 flex-shrink-0">
                  Index (0-255):
                </label>
                <input
                  type="number"
                  id="bg256"
                  value={bg256Value}
                  min="0"
                  max="255"
                  onChange={(e) => setBg256Value(parseInt(e.target.value, 10))}
                  className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
              <Color256Palette
                selectedValue={bg256Value}
                onSelect={setBg256Value}
              />
            </div>
          )}
          {bgMode === "rgb" && (
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="w-40 flex-shrink-0">RGB:</div>
              <RgbColorPicker rgb={bgRgb} onChange={setBgRgb} />
              <input
                type="number"
                placeholder="R"
                value={bgRgb.r}
                min="0"
                max="255"
                onChange={(e) =>
                  setBgRgb((p) => ({ ...p, r: parseInt(e.target.value, 10) }))
                }
                className="p-2 border rounded w-20 dark:bg-gray-800 dark:border-gray-600"
              />
              <input
                type="number"
                placeholder="G"
                value={bgRgb.g}
                min="0"
                max="255"
                onChange={(e) =>
                  setBgRgb((p) => ({ ...p, g: parseInt(e.target.value, 10) }))
                }
                className="p-2 border rounded w-20 dark:bg-gray-800 dark:border-gray-600"
              />
              <input
                type="number"
                placeholder="B"
                value={bgRgb.b}
                min="0"
                max="255"
                onChange={(e) =>
                  setBgRgb((p) => ({ ...p, b: parseInt(e.target.value, 10) }))
                }
                className="p-2 border rounded w-20 dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
          )}
          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!includeBgInCode}
              onChange={(e) => setIncludeBgInCode(!e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm">Do not include in code output</span>
          </label>
        </div>

        <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
          <OptionGroup
            label="Style:"
            options={STYLE_LABELS.map((s) => ({
              label: s.label,
              value: s.code,
            }))}
            selectedValue={selectedStyleCodes}
            onToggle={handleStyleToggle}
            isMultiSelect={true}
          />
        </div>

      </div>
      <Link
        href="https://github.com/jamisonrobey/ansi-generator"
        aria-label="View ANSI Generator source code on GitHub"
        className="mt-8"
      >
        <FaGithub className="w-8 h-8" />
      </Link>
    </div>
  );
}
