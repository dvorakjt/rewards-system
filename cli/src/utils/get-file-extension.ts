export function getFileExtension(filepath: string) {
  if (!filepath.includes(".")) return "";

  return filepath.split(".").at(-1);
}
