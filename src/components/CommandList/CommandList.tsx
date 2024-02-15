import type { CommandLine } from "./types";

import Button from "../Button";

type Props = {
  commands: CommandLine[];
  onClickEditItem: (commandLine: CommandLine) => void;
  onClickDeleteItem: (slug: string) => void;
  onCopyToClipboard: (command: string) => void;
  onClickCopyWithValue: (command: string) => void;
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
      {commands.length === 0 && <div>No commands</div>}
      {commands.map((command, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>{command.icon} </span>
              <span>{command.name}</span>
              <Button onClick={() => onCopyToClipboard(command.command)}>
                Copy
              </Button>
              <Button onClick={() => onClickCopyWithValue(command.command)}>
                Copy with value
              </Button>
            </div>
            <div>
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
