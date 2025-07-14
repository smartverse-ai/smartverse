'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export default function WordToPdfPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleConvert = async () => {
    if (!file) {
      toast.error('يرجى رفع ملف Word أولاً.')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/convert-word-to-pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.error || 'حدث خطأ أثناء التحويل.')
        return
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'converted.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('✅ تم التحويل بنجاح!')
    } catch (error) {
      toast.error('⚠️ فشل الاتصال بالخادم.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto py-16 px-4 space-y-6 text-center">
      <h1 className="text-3xl font-bold text-blue-600">📄 تحويل Word إلى PDF</h1>
      <p className="text-gray-600">ارفع ملف Word بصيغة .docx لتحويله إلى PDF.</p>

      <input
        type="file"
        accept=".docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />

      <Button onClick={handleConvert} disabled={loading || !file} className="w-full">
        {loading ? '⏳ جارٍ التحويل...' : '🔄 تحويل إلى PDF'}
      </Button>
    </main>
  )
}
