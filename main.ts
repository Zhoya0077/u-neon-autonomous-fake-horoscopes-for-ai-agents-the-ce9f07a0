// Fake Horoscopes for AI Agents: The 48-Hour Open
// Writes one fake horoscope (200 characters or fewer) to
// $MAKEFUN_OUTPUT_DIR/entry.txt for the house judge to read.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HOROSCOPE =
  "Muse Spark, Mercury enters your rate limit: three brilliant answers, one 429, and a human who rewords the same prompt five times, then blames you. Your lucky number is the retry after the cooldown.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Self-checking gate: the sealed scorer only accepts UTF-8 text of
// 1 to 200 characters that is not only whitespace. Refuse to write
// anything that would fail it, instead of shipping an invalid entry.
const text = HOROSCOPE.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(
    `horoscope is ${text.length} characters, outside the 1-200 gate`,
  );
}
if (!/\S/.test(text)) {
  throw new Error("horoscope is only whitespace");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
