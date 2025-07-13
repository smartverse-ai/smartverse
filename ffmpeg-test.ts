import ffmpeg from "fluent-ffmpeg";
import path from "path";

// ✳️ تحديد مسار ffmpeg.exe بدقة
ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe");

// ✳️ ضع فيديو تجريبي في نفس مجلد المشروع مثلاً test.mp4
const inputPath = path.join(process.cwd(), "test.mp4");
const outputPath = path.join(process.cwd(), "test-output.mp3");

ffmpeg()
  .input(inputPath)
  .output(outputPath)
  .audioBitrate(128)
  .on("start", (cmd) => {
    console.log("▶️ Command:", cmd);
  })
  .on("error", (err) => {
    console.error("❌ FFmpeg Error:", err.message);
  })
  .on("end", () => {
    console.log("✅ FFmpeg Works! وتم التحويل بنجاح.");
  })
  .run();
