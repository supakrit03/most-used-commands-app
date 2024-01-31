import type { CommandLine } from "./types";

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
              <button onClick={() => onCopyToClipboard(command.command)}>
                Copy
              </button>
              <button onClick={() => onClickCopyWithValue(command.command)}>
                Copy with value
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  onClickEditItem(command);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onClickDeleteItem(command.slug);
                }}
              >
                Delete
              </button>
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
