import { IconType } from "react-icons";

interface IconButtonProps {
  icon: IconType;
  text: string;
}

export const IconButton = (props: IconButtonProps) => {
  return (
    <button className="items-center space-x-4 flex justify-between p-2 border border-gray-300 dark:border-gray-800 rounded-xl">
      <props.icon />
      <p>{props.text}</p>
    </button>
  );
};