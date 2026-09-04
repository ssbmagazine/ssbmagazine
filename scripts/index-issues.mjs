import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const issuesDir = join(root, "public", "issues");
const coversDir = join(root, "public", "covers");
const catalogPath = join(root, "src", "data", "issues.json");

GlobalWorkerOptions.workerSrc = pathToFileURL(
  join(root, "node_modules", "pdfjs-dist", "legacy", "build", "pdf.worker.mjs"),
).href;

Object.assign(globalThis, { DOMMatrix, ImageData, Path2D });

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_TE = [
  "జనవరి",
  "ఫిబ్రవరి",
  "మార్చి",
  "ఏప్రిల్",
  "మే",
  "జూన్",
  "జూలై",
  "ఆగస్టు",
  "సెప్టెంబర్",
  "అక్టోబర్",
  "నవంబర్",
  "డిసెంబర్",
];

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    return { canvas, context: canvas.getContext("2d") };
  }

  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }

  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

function listYearDirs() {
  if (!statSync(issuesDir, { throwIfNoEntry: false })?.isDirectory()) {
    return [];
  }
  return readdirSync(issuesDir)
    .filter((name) => /^\d{4}$/.test(name) && statSync(join(issuesDir, name)).isDirectory())
    .sort();
}

function titleFromSlug(slug) {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function readPdfMeta(pdfPath, coverPath) {
  const data = new Uint8Array(readFileSync(pdfPath));
  const canvasFactory = new NodeCanvasFactory();
  const doc = await getDocument({
    data,
    isEvalSupported: false,
    canvasFactory,
    verbosity: 0,
  }).promise;

  const pageCount = doc.numPages;
  mkdirSync(dirname(coverPath), { recursive: true });

  try {
    const page = await doc.getPage(1);
    const targetWidth = 480;
    const unscaled = page.getViewport({ scale: 1 });
    const scale = targetWidth / unscaled.width;
    const viewport = page.getViewport({ scale });
    const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);
    await page.render({
      canvasContext: canvasAndContext.context,
      viewport,
      canvas: canvasAndContext.canvas,
    }).promise;
    writeFileSync(coverPath, canvasAndContext.canvas.toBuffer("image/jpeg", 82));
    canvasFactory.destroy(canvasAndContext);
  } catch (error) {
    console.warn(`Cover failed for ${pdfPath}:`, error instanceof Error ? error.message : error);
  } finally {
    await doc.destroy();
  }

  return pageCount;
}

async function main() {
  const issues = [];

  for (const yearName of listYearDirs()) {
    const year = Number(yearName);
    const yearDir = join(issuesDir, yearName);
    const files = readdirSync(yearDir)
      .filter((name) => extname(name).toLowerCase() === ".pdf")
      .sort();

    for (const file of files) {
      const slug = file.replace(/\.pdf$/i, "");
      const monthMatch = slug.match(/^(\d{2})$/);
      const month = monthMatch ? Number(monthMatch[1]) : null;
      const type = month && month >= 1 && month <= 12 ? "monthly" : "special";
      const id = `${year}-${slug}`;
      const pdfRel = `issues/${yearName}/${file}`;
      const coverRel = `covers/${yearName}/${slug}.jpg`;
      const pdfPath = join(yearDir, file);
      const coverPath = join(coversDir, yearName, `${slug}.jpg`);

      let pageCount = null;
      try {
        pageCount = await readPdfMeta(pdfPath, coverPath);
        console.log(`Indexed ${pdfRel} (${pageCount} pages)`);
      } catch (error) {
        console.warn(`Could not read ${pdfRel}:`, error instanceof Error ? error.message : error);
      }

      const title =
        type === "monthly" && month
          ? { te: `${MONTHS_TE[month - 1]} ${year}`, en: `${MONTHS_EN[month - 1]} ${year}` }
          : { te: titleFromSlug(slug), en: titleFromSlug(slug) };

      issues.push({
        id,
        year,
        month: type === "monthly" ? month : null,
        type,
        slug,
        title,
        pdf: pdfRel,
        cover: coverRel,
        pageCount,
      });
    }
  }

  issues.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    const am = a.month ?? 99;
    const bm = b.month ?? 99;
    if (am !== bm) return am - bm;
    return a.slug.localeCompare(b.slug);
  });

  mkdirSync(dirname(catalogPath), { recursive: true });
  writeFileSync(catalogPath, `${JSON.stringify(issues, null, 2)}\n`);
  console.log(`Wrote ${issues.length} issues to ${catalogPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
