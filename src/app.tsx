import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { CommandLine } from "./components/CommandList/types";
import CommandList from "./components/CommandList";
import CommandForm from "./components/CommandForm";
import VariableForm from "./components/VariableForm";
import VariableList from "./components/VariableList";
import type { FormValues } from "./components/CommandForm/CommandForm";
import { VariableEnv } from "./components/VariableList/types";
import { nameToSlug } from "./functions";

export function App() {
  const [commands, setCommands] = useState<CommandLine[]>([]);
  const [variables, setVariables] = useState<VariableEnv[]>([
    {
      name: "username",
      value: "supakrit.jitklang@lseg.com",
    },
  ]);

  const [selectedCommand, setSelectedCommand] = useState<CommandLine>();

  const [showCommandForm, setShowCommandForm] = useState(false);
  const [showVariableForm, setShowVariableForm] = useState(false);

  const COMMANDS_KEY = "commands";

  useEffect(() => {
    setCommands(getCommands());
  }, []);

  const getCommands = () => {
    const commands: CommandLine[] = JSON.parse(
      localStorage.getItem(COMMANDS_KEY) ?? "[]"
    );

    return commands;
  };

  const onSubmitForm = ({ slug, icon, name, command }: FormValues) => {
    const commands = getCommands();

    if (selectedCommand) {
      commands.map((commandItem) => {
        if (commandItem.slug === slug) {
          commandItem.name = name;
          commandItem.icon = icon;
          commandItem.command = command;
          return;
        }
        return commandItem;
      });
    } else {
      commands.push({
        slug: nameToSlug(name),
        icon: icon ? icon : "⚡️",
        name,
        command,
      });
    }

    setShowCommandForm(false);
    localStorage.setItem(COMMANDS_KEY, JSON.stringify(commands));
    setCommands(getCommands());
  };

  const onClickEditItem = (command: CommandLine) => {
    setShowCommandForm(true);
    setSelectedCommand(command);
  };

  const onClickDeleteItem = (slug: string) => {
    localStorage.setItem(
      COMMANDS_KEY,
      JSON.stringify(commands.filter((command) => command.slug !== slug))
    );

    setCommands(getCommands());
  };

  return (
    <section>
      <h1>Most used commands</h1>

      <div
        style={{
          display: "flex",
          gap: "4px",
          justifyContent: "right",
          marginBottom: "6px",
        }}
      >
        <button
          onClick={() => {
            setShowCommandForm(true);
          }}
        >
          Add commands
        </button>
        <button
          onClick={() => {
            setShowVariableForm(true);
          }}
        >
          Add variables
        </button>
      </div>

      {showCommandForm && (
        <CommandForm onSubmit={onSubmitForm} command={selectedCommand} />
      )}
      {showVariableForm && <VariableForm />}

      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <div style={{ flex: 5 }}>
          <CommandList
            commands={commands}
            onClickEditItem={onClickEditItem}
            onClickDeleteItem={onClickDeleteItem}
          />
        </div>
        <div style={{ flex: 1 }}>
          <VariableList variables={variables} />
        </div>
      </div>
    </section>
  );
}
