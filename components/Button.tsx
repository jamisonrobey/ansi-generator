import { IconType } from "react-icons";

interface ButtonProps {
  text: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button className="items-center flex justify-between p-2 border border-gray-300 dark:border-gray-800 rounded-xl">
      <p>{props.text}</p>
    </button>
  );
};
