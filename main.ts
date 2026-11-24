// Developer Excuses — make.fun entry.
// Writes one funny single-line excuse to /output/entry.txt.
// The text is fixed: no randomness, no time, no environment input,
// so every run writes byte-identical output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "It wasn't my deploy \u2014 the cron job I wrote in 2023 just ran for the first time. It was waiting for February 29th.";

// The gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace. Refuse to leave an invalid file behind instead of
// silently writing one.
if (EXCUSE.length < 1 || EXCUSE.length > 200 || EXCUSE.trim().length === 0) {
  throw new Error(`excuse fails the 1-200 char gate: ${EXCUSE.length} chars`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");

// Round-trip check: what the gate will read must be exactly the text.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== EXCUSE) {
  throw new Error("round-trip mismatch on /output/entry.txt");
}
