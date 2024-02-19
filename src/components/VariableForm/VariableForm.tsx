import Button from "../Button";

export type FormValues = {
  name: string;
  value: string;
  isSecret: boolean;
};

type Props = {
  onSubmit: (values: FormValues) => void;
};

const VariableForm = ({ onSubmit }: Props) => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const name = form["variableName"].value;
    const value = form["variableValue"].value;
    const isSecret = form["variableIsSecret"].checked;

    onSubmit({
      name,
      value,
      isSecret,
    });

    form.reset();
  };

  return (
    <form
      autocomplete="off"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        name="variableName"
        placeholder="Variable name"
      />
      <input
        required
        type="text"
        name="variableValue"
        placeholder="Variable value"
      />
      <div className="flex gap-2">
        <input type="checkbox" id="variableIsSecret" name="variableIsSecret" />
        <label for="variableIsSecret">Secret</label>
      </div>

      <Button>ADD</Button>
    </form>
  );
};

export default VariableForm;
