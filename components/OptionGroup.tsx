import { Button } from "./Button";

interface OptionGroupProps {
  label: string;
  options: string[];
}

export const OptionGroup = (props: OptionGroupProps) => (
  <div className="flex items-center">
    <div className="w-40 flex-shrink-0">
      <h2>{props.label}</h2>
    </div>
    <div className="flex flex-wrap gap-2">
      {props.options.map((option) => (
        <Button key={option} text={option} />
      ))}
    </div>
  </div>
);
