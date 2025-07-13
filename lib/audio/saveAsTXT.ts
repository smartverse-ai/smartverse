import fs from "fs";
import path from "path";

export async function saveAsTXT(text: string, fileName: string) {
  const outputPath = path.join("public", "transcripts", `${fileName}.txt`);
  fs.writeFileSync(outputPath, text, "utf8");
}
