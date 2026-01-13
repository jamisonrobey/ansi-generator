import { get256ColorCss } from "@/lib/ansiTypes";

interface Color256PaletteProps {
  selectedValue: number;
  onSelect: (value: number) => void;
}

export function Color256Palette({
  selectedValue,
  onSelect,
}: Color256PaletteProps) {
  // Generate all 256 colors
  const colors = Array.from({ length: 256 }, (_, i) => i);

  // Split into sections for better layout
  const standardColors = colors.slice(0, 16); // 0-15: standard + bright
  const cubeColors = colors.slice(16, 232); // 16-231: 6x6x6 color cube
  const grayscaleColors = colors.slice(232, 256); // 232-255: grayscale

  return (
    <div className="mt-2 space-y-2">
      {/* Standard and bright colors (2 rows of 8) */}
      <div className="grid grid-cols-8 gap-1">
        {standardColors.map((code) => (
          <button
            key={code}
            onClick={() => onSelect(code)}
            className={`w-6 h-6 rounded border-2 transition-transform hover:scale-110 ${
              selectedValue === code
                ? "border-blue-500 ring-2 ring-blue-300"
                : "border-gray-400 dark:border-gray-600"
            }`}
            style={{ backgroundColor: get256ColorCss(code) }}
            title={`Color ${code}`}
          />
        ))}
      </div>

      {/* 6x6x6 color cube (6 rows of 36) */}
      <div className="grid grid-cols-18 gap-0.5" style={{ gridTemplateColumns: "repeat(36, 1fr)" }}>
        {cubeColors.map((code) => (
          <button
            key={code}
            onClick={() => onSelect(code)}
            className={`w-4 h-4 rounded-sm border transition-transform hover:scale-125 hover:z-10 ${
              selectedValue === code
                ? "border-blue-500 ring-1 ring-blue-300"
                : "border-transparent"
            }`}
            style={{ backgroundColor: get256ColorCss(code) }}
            title={`Color ${code}`}
          />
        ))}
      </div>

      {/* Grayscale (1 row of 24) */}
      <div className="grid grid-cols-12 gap-1">
        {grayscaleColors.map((code) => (
          <button
            key={code}
            onClick={() => onSelect(code)}
            className={`w-5 h-5 rounded border-2 transition-transform hover:scale-110 ${
              selectedValue === code
                ? "border-blue-500 ring-2 ring-blue-300"
                : "border-gray-400 dark:border-gray-600"
            }`}
            style={{ backgroundColor: get256ColorCss(code) }}
            title={`Color ${code}`}
          />
        ))}
      </div>
    </div>
  );
}
