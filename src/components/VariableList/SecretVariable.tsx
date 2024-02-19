import { useEffect, useState } from "preact/hooks";

const VisibleSecret = ({
  onClick,
}: {
  onClick: (checked: boolean) => void;
}) => {
  return (
    <span className="inline-flex gap-1">
      <input
        type="checkbox"
        id="showSecret"
        onChange={(e) => {
          const { checked } = e.target as HTMLInputElement;
          onClick(checked);
        }}
      />
      <label for="showSecret">Show</label>
    </span>
  );
};

type Props = {
  isSecret: boolean;
  text: string;
};

const SecretVariable = ({ isSecret, text }: Props) => {
  const [showVarible, setShowVarible] = useState(true);

  useEffect(() => {
    if (isSecret) setShowVarible(false);
  }, [isSecret]);

  return (
    <div className="flex gap-4">
      <div className="min-w-10">{showVarible ? text : "*****"}</div>
      {isSecret && (
        <VisibleSecret
          onClick={(checked) => {
            setShowVarible(checked);
          }}
        />
      )}
    </div>
  );
};

export default SecretVariable;
