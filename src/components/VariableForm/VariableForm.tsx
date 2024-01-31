export type FormValues = {
  name: string;
  value: string;
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

    onSubmit({
      name,
      value,
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
      <button type="summit">ADD</button>
    </form>
  );
};

export default VariableForm;
