type Props = {
  text: string;
  visible: boolean;
};

const Toast = ({ text, visible }: Props) => {
  return (
    <div
      className={`fixed flex items-center w-full max-w-xs p-4 space-x-4 
      text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 
      rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800 
      transition ease-in-out delay-1000 bg-blue-500
      ${visible ? "visible" : "hidden"}
      `}
      role="alert"
    >
      <div className="text-white text-sm font-normal">{text}</div>
    </div>
  );
};

export default Toast;
