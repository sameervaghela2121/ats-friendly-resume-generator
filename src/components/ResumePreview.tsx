import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface ResumePreviewProps {
  pdfUrl: string | null;
}

export function ResumePreview({ pdfUrl }: ResumePreviewProps) {
  if (!pdfUrl) return null;

  return (
    <div className="w-full max-w-2xl mx-auto border rounded-lg overflow-hidden shadow-lg">
      <Document file={pdfUrl}>
        <Page pageNumber={1} width={600} />
      </Document>
    </div>
  );
}