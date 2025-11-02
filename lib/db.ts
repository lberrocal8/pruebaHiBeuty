import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

function getFilePath(name: string) {
  return path.join(dataDir, `${name}.json`);
}

export function readData<T>(file: string): T[] {
  const filePath = getFilePath(file);
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content || "[]");
}

export function writeData<T>(file: string, data: T[]): void {
  const filePath = getFilePath(file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
