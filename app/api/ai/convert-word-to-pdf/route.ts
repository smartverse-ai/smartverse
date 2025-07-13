import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'
import { PDFDocument, rgb } from 'pdf-lib'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file || file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return NextResponse.json({ error: 'الرجاء رفع ملف .docx فقط.' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const { value: plainText } = await mammoth.extractRawText({ buffer })

    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()

    page.drawText(plainText || 'لا يوجد محتوى في الملف.', {
      x: 50,
      y: height - 50,
      size: 12,
      color: rgb(0, 0, 0),
      maxWidth: width - 100,
      lineHeight: 18,
    })

    const pdfBytes = await pdfDoc.save()

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="converted.pdf"',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ أثناء التحويل.' }, { status: 500 })
  }
}
