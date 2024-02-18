export function counterUsedCommand(slug: string) {
  const commandsUsedCount = getFromLocalStorage();

  const count = commandsUsedCount[slug] ?? 0;

  commandsUsedCount[slug] = count + 1;

  saveToLocalStorage(commandsUsedCount);
}

const COMMANDS_USED_COUNT = "commandsUsedCount";

function saveToLocalStorage(json: object) {
  localStorage.setItem(COMMANDS_USED_COUNT, JSON.stringify(json));
}

export function getFromLocalStorage(): { [key: string]: number } {
  return JSON.parse(localStorage.getItem(COMMANDS_USED_COUNT) ?? "{}");
}
