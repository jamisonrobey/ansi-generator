import { Button } from "./Button";

interface OptionGroupProps {
  label: string;
  options: string[];
  selectedOption: string;
  updateOption: (value: string) => void;
}

export const OptionGroup: React.FC<OptionGroupProps> = ({
  label,
  options,
  selectedOption,
  updateOption,
}) => (
  <div className="flex items-center">
    <div className="w-40 flex-shrink-0">
      <h2>{label}</h2>
    </div>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          text={option}
          onClick={() => updateOption(option)}
          isSelected={selectedOption === option}
        />
      ))}
    </div>
  </div>
);
