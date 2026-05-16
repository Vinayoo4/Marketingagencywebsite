import { promises as fs } from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(process.cwd(), '..', 'data');

export async function readJsonFile<T>(fileName: string): Promise<T> {
  const filePath = path.join(dataDir, fileName);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function writeJsonFile<T>(fileName: string, payload: T): Promise<void> {
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');
}
