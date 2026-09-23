import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";

type Props = {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  width: number;
  zoom: number;
  /** height / width — keeps unrendered pages from collapsing (breaks jump-to-page). */
  aspectRatio: number;
};

export function PdfPage({ pdf, pageNumber, width, zoom, aspectRatio }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(pageNumber <= 2);
  const reservedHeight =
    width > 40 && aspectRatio > 0 ? Math.floor(width * zoom * aspectRatio) : undefined;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { rootMargin: "1400px 0px" },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visible || width < 40) return;

    let cancelled = false;
    let task: RenderTask | undefined;

    void (async () => {
      try {
        const page = await pdf.getPage(pageNumber);
        if (cancelled) return;
        const base = page.getViewport({ scale: 1 });
        const scale = (width / base.width) * zoom;
        const viewport = page.getViewport({ scale });
        const context = canvas.getContext("2d", { alpha: false });
        if (!context || cancelled) return;
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        task = page.render({
          canvasContext: context,
          viewport,
          canvas,
          background: "#ffffff",
        });
        await task.promise;
      } catch (error) {
        if ((error as { name?: string }).name !== "RenderingCancelledException") {
          console.error(`PDF page ${pageNumber} failed`, error);
        }
      }
    })();

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [pdf, pageNumber, width, zoom, visible]);

  return (
    <div
      className="pdf-page"
      ref={wrapRef}
      data-page={pageNumber}
      style={reservedHeight ? { minHeight: reservedHeight } : undefined}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
