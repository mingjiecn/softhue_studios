import { readFile, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import heicConvert from "heic-convert";

const __dirname = dirname(fileURLToPath(import.meta.url));
const paintingsDir = join(__dirname, "../public/images/paintings");

const files = ["IMG_0585", "IMG_0586", "IMG_0587", "IMG_0588"];

for (const name of files) {
  const inputPath = join(paintingsDir, `${name}.HEIC`);
  const outputPath = join(paintingsDir, `${name}.jpg`);
  try {
    const inputBuffer = await readFile(inputPath);
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 0.9,
    });
    await writeFile(outputPath, outputBuffer);
    console.log(`Converted ${name}.HEIC → ${name}.jpg`);
  } catch (err) {
    console.error(`Failed ${name}:`, err.message);
  }
}
