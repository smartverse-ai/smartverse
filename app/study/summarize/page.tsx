'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { jsPDF } from 'jspdf'
import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph, TextRun } from 'docx'

export default function SummarizePage() {
  const [input, setInput] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [language, setLanguage] = useState<'ar' | 'en' | 'fr'>('ar')
  const [summaryType, setSummaryType] = useState<'paragraph' | 'bullets'>('paragraph')
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const wordCount = input.trim().split(/\s+/).filter(Boolean).length

  const handlePDFUpload = (file: File) => {
    if (!file || file.type !== 'application/pdf') {
      toast.error('🚫 الرجاء رفع ملف PDF فقط.')
      return
    }
    setUploadedFile(file)
    setSummary('')
    setPreview(null)
  }

  const handleSummarizePDF = async () => {
    if (!uploadedFile) return
    setLoading(true)
    setProgress(0)
    setSummary('')
    setCopied(false)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)
      formData.append('language', language)
      formData.append('summaryType', summaryType)

      const res = await axios.post('/api/ai/summarize-pdf', formData, {
        onUploadProgress: (e) =>
          setProgress(Math.round((e.loaded * 50) / (e.total || 1))),
        onDownloadProgress: (e) =>
          setProgress(50 + Math.round((e.loaded * 50) / (e.total || 1))),
      })

      setSummary(res.data.summary)
      setPreview(res.data.preview || null)
      toast.success('✅ تم تلخيص الملف بنجاح!')
    } catch (err: any) {
      toast.error(err.response?.data?.error || '⚠️ حدث خطأ أثناء التلخيص.')
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  const handleTextSummarize = async () => {
    if (!input.trim()) return toast.warning('⚠️ يرجى إدخال نص أولاً.')
    setLoading(true)
    setSummary('')
    setCopied(false)
    setProgress(0)

    try {
      const res = await axios.post(
        '/api/ai/summarize',
        { text: input, language, summaryType },
        {
          onDownloadProgress: (e) =>
            setProgress(Math.round((e.loaded * 100) / (e.total || 1))),
        }
      )
      setSummary(res.data.summary)
      toast.success('✅ تم التلخيص بنجاح!')
    } catch (err: any) {
      toast.error(err.response?.data?.error || '⚠️ حدث خطأ أثناء التلخيص.')
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(summary)
    setCopied(true)
    toast.success('📋 تم نسخ الملخص!')
    setTimeout(() => setCopied(false), 2000)
  }

  const reverseText = (text: string) => {
    return text
      .split('\n')
      .map((line) =>
        line
          .split(' ')
          .reverse()
          .map((word) => word.split('').reverse().join(''))
          .join(' ')
      )
      .join('\n')
  }

  const handleExport = async (format: 'pdf' | 'docx' | 'srt' | 'txt') => {
    if (!summary) return
    const filename = `smart-summary.${format}`

    if (format === 'pdf') {
      const fontUrl = '/Cairo-Regular.ttf'
      const fontName = 'Cairo-Regular'

      const response = await fetch(fontUrl)
      const fontData = await response.arrayBuffer()
      const fontBase64 = btoa(String.fromCharCode(...new Uint8Array(fontData)))

      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' })
      doc.addFileToVFS(`${fontName}.ttf`, fontBase64)
      doc.addFont(`${fontName}.ttf`, fontName, 'normal')
      doc.setFont(fontName)
      doc.setFontSize(12)

      const reversed = reverseText(summary)
      const lines = doc.splitTextToSize(reversed, 180)
      doc.text(lines, 200, 20, { align: 'right' })

      doc.save(filename)
    } else if (format === 'docx') {
      const paragraphs = summary.split('\n').map((line) =>
        new Paragraph({
          bidirectional: true,
          children: [
            new TextRun({
              text: line,
              font: 'Arial',
              rightToLeft: true,
            }),
          ],
        })
      )

      const doc = new Document({
        sections: [{ children: paragraphs }],
      })

      const blob = await Packer.toBlob(doc)
      saveAs(blob, filename)
    } else if (format === 'srt') {
      const lines = summary
        .split('\n')
        .map(
          (line, i) =>
            `${i + 1}\n00:00:${(i * 5)
              .toString()
              .padStart(2, '0')},000 --> 00:00:${((i + 1) * 5)
              .toString()
              .padStart(2, '0')},000\n${line.trim()}\n`
        )
        .join('\n')
      const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, filename)
    } else {
      const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, filename)
    }
  }

  return (
    <main
      className="max-w-3xl mx-auto py-16 px-4 space-y-6 text-right"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) handlePDFUpload(file)
      }}
    >
      <h1 className="text-3xl font-bold text-center text-blue-700">
        📝 التلخيص الذكي للطلاب
      </h1>
      <p className="text-center text-gray-600">
        ارفع ملف PDF أو أدخل نصًا لتحصل على تلخيص فوري بلغات مختلفة.
      </p>

      {loading && (
        <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div>
        <label className="block mb-2 font-medium text-gray-700">📎 رفع ملف PDF:</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files?.[0]) handlePDFUpload(e.target.files[0])
          }}
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>

      {preview && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 whitespace-pre-wrap max-h-40 overflow-y-auto rounded-md text-sm">
          <strong className="block mb-1">📄 معاينة من الملف:</strong>
          {preview}
        </div>
      )}

      {uploadedFile && (
        <Button onClick={handleSummarizePDF} disabled={loading} className="w-full">
          {loading ? '⏳ جارٍ التلخيص...' : '📄 تلخيص الملف'}
        </Button>
      )}

      <div>
        <label className="block mb-2 font-medium text-gray-700">✍️ النص:</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب أو الصق النص هنا..."
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2">
          <label className="text-gray-700">🌐 اللغة:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="border p-2 rounded-lg"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-700">🧾 نوع التلخيص:</label>
          <select
            value={summaryType}
            onChange={(e) => setSummaryType(e.target.value as any)}
            className="border p-2 rounded-lg"
          >
            <option value="paragraph">فقرة واحدة</option>
            <option value="bullets">نقاط رئيسية</option>
          </select>
        </div>
      </div>

      <div className="text-sm text-gray-500 text-right">
        عدد الكلمات: <span className="font-medium">{wordCount}</span>
      </div>

      <Button
        onClick={handleTextSummarize}
        disabled={loading || !input.trim()}
        className="w-full"
      >
        {loading ? '⏳ جارٍ التلخيص...' : '🧠 تلخيص النص'}
      </Button>

      {summary && (
        <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg mt-6 relative space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-3">📌 الملخص:</h2>
            <pre className="whitespace-pre-wrap text-gray-800">{summary}</pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 left-3 text-sm text-blue-600 hover:underline"
            >
              {copied ? '✅ تم النسخ' : '📋 نسخ'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            <Button onClick={() => handleExport('pdf')}>📄 تحميل PDF</Button>
            <Button onClick={() => handleExport('docx')}>📝 Word</Button>
            <Button onClick={() => handleExport('txt')}>📁 Text</Button>
            <Button onClick={() => handleExport('srt')}>🎬 SRT</Button>
          </div>

          <div className="text-center pt-4">
            <a
              href="/offers"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:scale-105 transform transition"
            >
              🎁 احصل على الخطة المجانية المطورة الآن
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
