import type { CommandLine } from "./types";

import Button from "../Button";

type Props = {
  commands: CommandLine[];
  onClickEditItem: (commandLine: CommandLine) => void;
  onClickDeleteItem: (slug: string) => void;
  onCopyToClipboard: (command: string) => void;
  onClickCopyWithValue: (slug: string, command: string) => void;
};

const CommandList = ({
  commands,
  onClickEditItem,
  onClickDeleteItem,
  onCopyToClipboard,
  onClickCopyWithValue,
}: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {commands.length === 0 && <div>No commands , Add your command.</div>}
      {commands.map((command, index) => (
        <div
          key={index}
          className="flex flex-col border border-solid border-gray-300 p-4 rounded-md gap-2"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>{command.icon} </span>
              <span>{command.name}</span>
              <Button onClick={() => onCopyToClipboard(command.command)}>
                Copy
              </Button>
              <Button
                onClick={() =>
                  onClickCopyWithValue(command.slug, command.command)
                }
              >
                Copy with value
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  onClickEditItem(command);
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  onClickDeleteItem(command.slug);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
          <pre>
            <code>{command.command}</code>
          </pre>
        </div>
      ))}
    </div>
  );
};

export default CommandList;
