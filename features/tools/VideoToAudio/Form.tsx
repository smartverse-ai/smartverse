"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { uploadAndConvertVideo } from "./api"

export function VideoToAudioForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleConvert = async () => {
    if (!videoFile) return
    setLoading(true)
    const url = await uploadAndConvertVideo(videoFile)
    setAudioUrl(url)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <Input type="file" accept="video/*" onChange={(e) => {
        const file = e.target.files?.[0]
        if (file) setVideoFile(file)
      }} />

      <Button onClick={handleConvert} disabled={!videoFile || loading}>
        {loading ? "جاري التحويل..." : "تحويل الفيديو إلى صوت"}
      </Button>

      {audioUrl && (
        <div className="mt-4">
          <p className="mb-2">✅ تم التحويل! يمكنك تحميل الملف:</p>
          <a
            href={audioUrl}
            download
            className="underline text-primary"
            target="_blank"
          >
            تحميل الملف الصوتي
          </a>
        </div>
      )}
    </div>
  )
}
