interface ButtonProps {
  text: string;
  onClick: () => void;
  isSelected?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  isSelected = false,
}) => {
  return (
    <button
      className={`items-center flex border-gray-300 dark:border-gray-800 justify-between p-2 rounded-xl ${
        isSelected ? "border-4" : "border"
      }`}
      onClick={onClick}
    >
      <p>{text}</p>
    </button>
  );
};
