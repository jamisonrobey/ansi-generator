import { Button } from "./Button";

interface OptionGroupBaseProps {
  label: string;
  options: { label: string; value: string }[];
}

interface OptionGroupSingleProps extends OptionGroupBaseProps {
  isMultiSelect?: false;
  selectedValue: string;
  onUpdate: (value: string) => void;
  onToggle?: never;
}

interface OptionGroupMultiProps extends OptionGroupBaseProps {
  isMultiSelect: true;
  selectedValue: string[];
  onToggle: (value: string) => void;
  onUpdate?: never;
}

export const OptionGroup: React.FC<
  OptionGroupSingleProps | OptionGroupMultiProps
> = (props) => {
  const { label, options, selectedValue, isMultiSelect } = props;

  return (
    <div className="flex items-center flex-wrap gap-y-2">
      <div className="w-40 flex-shrink-0">
        <h2>{label}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            text={option.label}
            onClick={() => {
              if (isMultiSelect) {
                (props as OptionGroupMultiProps).onToggle(option.value);
              } else {
                (props as OptionGroupSingleProps).onUpdate(option.value);
              }
            }}
            isSelected={
              isMultiSelect
                ? (selectedValue as string[]).includes(option.value)
                : selectedValue === option.value
            }
          />
        ))}
      </div>
    </div>
  );
};
