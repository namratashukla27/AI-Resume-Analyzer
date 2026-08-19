import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractTextFromPDF = async (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;

        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          const pageText = textContent.items
            .map((item) => item.str.trim())
            .filter(Boolean)
            .join(" ");

          fullText += pageText + "\n\n";
        }

        const cleanedText = fullText
          .replace(/\s+/g, " ")
          .replace(/\n\s*\n/g, "\n")
          .trim();

        resolve(cleanedText);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
  });
};