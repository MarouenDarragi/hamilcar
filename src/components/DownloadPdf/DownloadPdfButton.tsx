/* ------------------------------------------------------------------ */
/* components/PdfDownloadButton.tsx                                   */
/* ------------------------------------------------------------------ */
'use client';

import { MutableRefObject } from 'react';
import html2canvas          from 'html2canvas';
import { jsPDF }            from 'jspdf';

export default function PdfDownloadButton({
  targetRef,                // ref du conteneur à capturer
  fileName = 'rapport.pdf', // nom du fichier
  footerText                // texte final facultatif
}:{
  targetRef:  MutableRefObject<HTMLElement|null>;
  fileName?:  string;
  footerText?: string;
}){

  async function handleDownload(){

    if(!targetRef.current) return;

    const pdf   = new jsPDF({ orientation:'p', unit:'mm', format:'a4' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    const sections = Array.from(
      targetRef.current.querySelectorAll<HTMLElement>('.pdf-section')
    );

    for(const [idx,sec] of sections.entries()){
      const canvas = await html2canvas(sec,{
        scale:2,
        backgroundColor:'#ffffff',
        onclone:(doc)=>{
          doc.querySelectorAll<HTMLElement>('[class*="shadow"]')
             .forEach(el=>{ el.style.boxShadow='none'; });
          doc.querySelectorAll<HTMLElement>('.pdf-section')
             .forEach(el=>{ el.style.pageBreakInside='avoid'; });
        }
      });

      const img   = canvas.toDataURL('image/png');
      const imgH  = canvas.height * pageW / canvas.width;

      let posY = 0;
      while(posY < imgH){
        pdf.addImage(img,'PNG',0,-posY,pageW,imgH,'','FAST');
        posY += pageH;
        if(posY < imgH) pdf.addPage();
      }
      if(idx < sections.length-1) pdf.addPage();
    }

    if(footerText){
      pdf.setFontSize(12);
      pdf.text(footerText, 20, pageH-20);
    }

    pdf.save(fileName);
  }

  return(
    <button
      onClick={handleDownload}
      className="px-6 py-2 rounded border-2 border-blue text-blue
                 hover:bg-blue hover:text-white transition-colors">
      Télécharger en&nbsp;PDF
    </button>
  );
}
