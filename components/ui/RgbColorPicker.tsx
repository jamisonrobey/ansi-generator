interface RgbColorPickerProps {
  rgb: { r: number; g: number; b: number };
  onChange: (rgb: { r: number; g: number; b: number }) => void;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function RgbColorPicker({ rgb, onChange }: RgbColorPickerProps) {
  const hexValue = rgbToHex(rgb.r, rgb.g, rgb.b);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(hexToRgb(e.target.value));
  };

  return (
    <input
      type="color"
      value={hexValue}
      onChange={handleColorChange}
      className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
      title="Pick a color"
    />
  );
}
