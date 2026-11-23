// One-letter entry: writes exactly one byte, nothing else.
const fs = require("node:fs");
const path = require("node:path");

// "a" (0x61) answers coffee; the file holds this byte and no newline.
const LETTER = 0x61;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = path.join(outDir, "entry.txt");

const entry = Buffer.from([LETTER]);
if (entry.length !== 1 || entry[0] !== LETTER) {
  throw new Error(`entry buffer must be the single byte 0x${LETTER.toString(16)}, got ${entry.length} byte(s)`);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, entry);

const written = fs.readFileSync(outFile);
if (written.length !== 1 || written[0] !== LETTER) {
  throw new Error(`${outFile} must hold the single byte 0x${LETTER.toString(16)}, read back ${written.length} byte(s)`);
}
