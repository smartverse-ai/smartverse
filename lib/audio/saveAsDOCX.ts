import fs from "fs";
import path from "path";
import { Document, Packer, Paragraph } from "docx";

export async function saveAsDOCX(text: string, fileName: string) {
  const doc = new Document({
    sections: [
      {
        children: [new Paragraph(text)],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join("public", "transcripts", `${fileName}.docx`);
  fs.writeFileSync(outputPath, buffer);
}
