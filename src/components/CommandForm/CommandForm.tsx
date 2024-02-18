import { nameToSlug } from "../../functions";
import Button from "../Button";
import { CommandLine } from "../CommandList/types";

export type FormValues = {
  slug: string;
  icon: string;
  name: string;
  command: string;
};

type Props = {
  command: CommandLine | null;
  onSubmit: (values: FormValues) => void;
};

const CommandForm = ({ command, onSubmit }: Props) => {
  const isEdit = !!command;

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const name = form["commandName"].value;

    onSubmit({
      slug: nameToSlug(name),
      icon: form["icon"].value,
      name,
      command: form["command"].value,
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
        type="text"
        name="icon"
        placeholder="Icon"
        value={command?.icon ?? "⚡️"}
      />
      <input
        required
        type="text"
        name="commandName"
        placeholder="Command name"
        value={command?.name}
      />
      <textarea
        required
        type="text"
        name="command"
        placeholder="Command here.."
        value={command?.command}
      />

      <Button> {isEdit ? "EDIT" : "ADD"} </Button>
    </form>
  );
};

export default CommandForm;
