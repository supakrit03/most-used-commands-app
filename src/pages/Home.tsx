import "../index.css";

import { useEffect, useState } from "preact/hooks";
import CommandList from "../components/CommandList";
import CommandForm from "../components/CommandForm";
import VariableForm from "../components/VariableForm";
import VariableList from "../components/VariableList";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { nameToSlug } from "../functions";
import { counterUsedCommand } from "../services/statistic";

import type { FormValues as CommandValues } from "../components/CommandForm/CommandForm";
import type { FormValues as VariableValues } from "../components/VariableForm/VariableForm";
import type { CommandLine } from "../components/CommandList/types";
import type { VariableEnv } from "../components/VariableList/types";

export default function Home() {
  const [commands, setCommands] = useState<CommandLine[]>([]);
  const [variables, setVariables] = useState<VariableEnv[]>([]);
  const [copiedCommand, setCopiedCommand] = useState("");

  const [selectedCommand, setSelectedCommand] = useState<CommandLine | null>(
    null
  );

  const [showCommandForm, setShowCommandForm] = useState(false);
  const [showVariableForm, setShowVariableForm] = useState(false);
  const [isVisibleToast, setIsVisibleToast] = useState(false);

  const COMMANDS_KEY = "commands";
  const VARIABLES_KEY = "variables";

  useEffect(() => {
    setCommands(getCommands());
    setVariables(getVariables());
  }, []);

  const getCommands = () => {
    const commands: CommandLine[] = JSON.parse(
      localStorage.getItem(COMMANDS_KEY) ?? "[]"
    );

    return commands;
  };

  const getVariables = () => {
    const variables: VariableEnv[] = JSON.parse(
      localStorage.getItem(VARIABLES_KEY) ?? "[]"
    );

    return variables;
  };

  const onSubmitCommandForm = ({
    slug,
    icon,
    name,
    command,
  }: CommandValues) => {
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
    setSelectedCommand(null);
    localStorage.setItem(COMMANDS_KEY, JSON.stringify(commands));
    setCommands(getCommands());
  };

  const onSubmitVariableForm = ({ name, value, isSecret }: VariableValues) => {
    const variables = getVariables();

    variables.push({
      slug: nameToSlug(name),
      name,
      value,
      isSecret,
    });

    setShowVariableForm(false);
    localStorage.setItem(VARIABLES_KEY, JSON.stringify(variables));
    setVariables(getVariables());
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

  const onCopyToClipboard = (command: string) => {
    window.navigator.clipboard.writeText(command);
  };

  const onClickCopyWithValue = (slug: string, command: string) => {
    let commandReplacedValue = "";
    let copiedCommand = "";

    const replaceCommand = (
      command: string,
      name: string,
      value: string,
      isSecret?: boolean
    ) => command.replace(`{{${name}}}`, isSecret ? "****" : value);

    for (let index = 0; index < variables.length; index++) {
      const { name, value, isSecret } = variables[index];

      if (commandReplacedValue == "") {
        commandReplacedValue = replaceCommand(command, name, value);
        copiedCommand = replaceCommand(command, name, value, isSecret);
      } else {
        commandReplacedValue = replaceCommand(
          commandReplacedValue,
          name,
          value
        );

        copiedCommand = replaceCommand(copiedCommand, name, value, isSecret);
      }
    }

    window.navigator.clipboard.writeText(commandReplacedValue);
    setIsVisibleToast(true);

    setCopiedCommand(copiedCommand);
    counterUsedCommand(slug);

    setTimeout(() => {
      setIsVisibleToast(false);
    }, 4000);
  };

  const onCloseCommandForm = () => {
    setShowCommandForm(false);
  };

  const onCloseVariableForm = () => {
    setShowVariableForm(false);
  };

  return (
    <section>
      <div
        style={{
          display: "flex",
          gap: "4px",
          justifyContent: "right",
          marginBottom: "6px",
        }}
      >
        <Button
          onClick={() => {
            setShowCommandForm(true);
          }}
        >
          Add commands
        </Button>
        <Button
          onClick={() => {
            setShowVariableForm(true);
          }}
        >
          Add variables
        </Button>
      </div>

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
            onCopyToClipboard={onCopyToClipboard}
            onClickCopyWithValue={onClickCopyWithValue}
          />
        </div>
        <div style={{ flex: 1 }}>
          <VariableList variables={variables} />
        </div>
      </div>

      <Toast visible={isVisibleToast} text={`Copied ${copiedCommand}`} />

      <Modal visible={showCommandForm} onCancel={onCloseCommandForm}>
        <CommandForm onSubmit={onSubmitCommandForm} command={selectedCommand} />
      </Modal>

      <Modal visible={showVariableForm} onCancel={onCloseVariableForm}>
        <VariableForm onSubmit={onSubmitVariableForm} />
      </Modal>
    </section>
  );
}
