import React from "react";
import { FaRedo } from "react-icons/fa";
import { IconButton } from "@/components/IconButton";
import { OptionGroup } from "@/components/OptionGroup";

const colors = [
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

const styles = ["Bold", "Italic", "Underline", "Strikethrough"];

const escapeSequences = ["\\x1b", "\\033", "\\e"];

export default function Home() {
  return (
    <div className="flex items-center flex-col max-w-4xl mx-auto">
      <h1 className="text-3xl mb-8">ANSI Escape Code Generator</h1>
      <div className="mb-8">
        <IconButton icon={FaRedo} text="Refresh" />
      </div>
      <div className="space-y-4 w-full">
        <OptionGroup label="Foreground Color:" options={colors} />
        <OptionGroup label="Background Color:" options={colors} />
        <OptionGroup label="Style:" options={styles} />
        <OptionGroup label="Escape sequence:" options={escapeSequences} />
      </div>
    </div>
  );
}
