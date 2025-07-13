import { jsPDF } from 'jspdf'
import arabicFont from './arabicFontBase64' // ملف منفصل يحتوي على الخط بصيغة base64

export function registerArabicFont() {
  jsPDF.API.events.push([
    'addFonts',
    function () {
      this.addFileToVFS('Amiri-Regular.ttf', arabicFont)
      this.addFont('Amiri-Regular.ttf', 'Amiri', 'normal')
    },
  ])
}
