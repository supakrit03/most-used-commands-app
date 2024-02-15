import type { ReactNode } from "react";

type Props = {
  onClick?: () => void;
  children: ReactNode;
};

const Button = ({ onClick, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
