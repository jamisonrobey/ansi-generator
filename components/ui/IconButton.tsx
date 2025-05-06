import { IconType } from "react-icons";

interface IconButtonProps {
  icon: IconType;
  text: string;
  onClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  text,
  onClick,
}) => {
  return (
    <button
      className="items-center space-x-4 flex justify-between p-2 border border-gray-300 dark:border-gray-800 rounded-xl"
      onClick={onClick}
    >
      <Icon />
      <p>{text}</p>
    </button>
  );
};
