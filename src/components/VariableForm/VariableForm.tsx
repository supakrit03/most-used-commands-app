type Props = {};

const VariableForm = (props: Props) => {
  const handleSubmit = () => {};

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
