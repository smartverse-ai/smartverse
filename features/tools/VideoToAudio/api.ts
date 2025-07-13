export async function uploadAndConvertVideo(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch("/api/ai/video-to-audio", {
    method: "POST",
    body: formData,
  })

  if (!res.ok) throw new Error("فشل التحويل")

  const data = await res.json()
  return data.url // رابط الصوت الناتج
}
