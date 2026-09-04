import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import workerUrl from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export { pdfjs };

export function loadPdf(url: string) {
  return pdfjs.getDocument({
    url,
    isEvalSupported: true,
    disableAutoFetch: false,
    disableStream: false,
  }).promise;
}
