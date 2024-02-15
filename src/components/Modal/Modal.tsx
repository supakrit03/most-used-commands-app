import { ReactNode } from "preact/compat";

type Props = {
  visible: boolean;
  children: ReactNode;
  onCancel: () => void;
};

const Modal = ({ visible, children, onCancel }: Props) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center ${
        visible ? "visible" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-black/50 z-0" onClick={onCancel} />
      <div className="relative z-10 min-w-80 min-h-40 bg-white rounded-md flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default Modal;
