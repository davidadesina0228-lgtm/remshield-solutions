#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";

const documents = [
  {
    input: "AI-DISCOVERABILITY-MASTER-OPERATING-MANUAL.md",
    output: "AI-DISCOVERABILITY-MASTER-OPERATING-MANUAL.pdf",
    subtitle: "Complete Operating Manual",
  },
  {
    input: "AI-DISCOVERABILITY-INTERNAL-OPERATING-MANUAL.md",
    output: "AI-DISCOVERABILITY-INTERNAL-OPERATING-MANUAL.pdf",
    subtitle: "Internal Operating Manual",
  },
  {
    input: "AI-DISCOVERABILITY-CLIENT-FACING-GUIDE.md",
    output: "AI-DISCOVERABILITY-CLIENT-FACING-GUIDE.pdf",
    subtitle: "Client Guide",
  },
];

const page = {
  width: 612,
  height: 792,
  marginX: 54,
  marginTop: 60,
  marginBottom: 54,
};

function escapePdfText(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\r/g, "");
}

function stripMarkdown(line) {
  return line
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1 ($2)")
    .replace(/^>\s?/, "")
    .trimEnd();
}

function styleForLine(line) {
  if (line.startsWith("# ")) {
    return { font: "F2", size: 20, leading: 28, before: 10, after: 8, text: line.slice(2).trim() };
  }
  if (line.startsWith("## ")) {
    return { font: "F2", size: 15, leading: 22, before: 12, after: 4, text: line.slice(3).trim() };
  }
  if (line.startsWith("### ")) {
    return { font: "F2", size: 12, leading: 18, before: 8, after: 2, text: line.slice(4).trim() };
  }
  if (line.startsWith("- ")) {
    return { font: "F1", size: 10, leading: 14, before: 0, after: 0, text: `- ${stripMarkdown(line.slice(2))}` };
  }
  if (/^\d+\.\s+/.test(line)) {
    return { font: "F1", size: 10, leading: 14, before: 0, after: 0, text: stripMarkdown(line) };
  }
  if (line.startsWith("|")) {
    return { font: "F3", size: 8, leading: 11, before: 0, after: 0, text: stripMarkdown(line) };
  }
  if (line.trim() === "") {
    return { blank: true, leading: 8 };
  }
  return { font: "F1", size: 10, leading: 14, before: 0, after: 2, text: stripMarkdown(line) };
}

function wrapText(text, size, font, indent = 0) {
  if (!text) {
    return [""];
  }

  const maxWidth = page.width - page.marginX * 2 - indent;
  const averageCharacterWidth = font === "F3" ? size * 0.58 : size * 0.5;
  const maxChars = Math.max(20, Math.floor(maxWidth / averageCharacterWidth));
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    if (!current) {
      current = word;
      continue;
    }

    if ((current.length + word.length + 1) <= maxChars) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.length ? lines : [text];
}

function paginate(markdown, subtitle) {
  const rawLines = markdown.replace(/\t/g, "  ").split(/\n/);
  const pages = [[]];
  let y = page.height - page.marginTop;
  let inCodeBlock = false;

  function addPage() {
    pages.push([]);
    y = page.height - page.marginTop;
  }

  function pushText(text, style, indent = 0) {
    const wrapped = wrapText(text, style.size, style.font, indent);

    for (const wrappedLine of wrapped) {
      if (y - style.leading < page.marginBottom) {
        addPage();
      }

      pages[pages.length - 1].push({
        x: page.marginX + indent,
        y,
        font: style.font,
        size: style.size,
        text: wrappedLine,
      });
      y -= style.leading;
    }
  }

  pages[0].push({
    x: page.marginX,
    y,
    font: "F2",
    size: 10,
    text: subtitle,
  });
  y -= 22;

  for (const rawLine of rawLines) {
    if (rawLine.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      y -= 4;
      continue;
    }

    const style = inCodeBlock
      ? { font: "F3", size: 8, leading: 11, before: 0, after: 0, text: rawLine }
      : styleForLine(rawLine);

    if (style.blank) {
      y -= style.leading;
      continue;
    }

    y -= style.before || 0;

    const indent = style.text.startsWith("- ") ? 10 : 0;
    pushText(style.text, style, indent);

    y -= style.after || 0;
  }

  return pages;
}

function contentStream(lines, pageNumber, totalPages) {
  const commands = [
    "q",
    "0.08 0.13 0.2 RG",
    `${page.marginX} ${page.height - 38} ${page.width - page.marginX * 2} 0 l`,
    "S",
    "Q",
  ];

  for (const line of lines) {
    commands.push("BT");
    commands.push(`/${line.font} ${line.size} Tf`);
    commands.push("0.09 0.11 0.16 rg");
    commands.push(`1 0 0 1 ${line.x.toFixed(2)} ${line.y.toFixed(2)} Tm`);
    commands.push(`(${escapePdfText(line.text)}) Tj`);
    commands.push("ET");
  }

  commands.push("BT");
  commands.push("/F1 8 Tf");
  commands.push("0.45 0.48 0.52 rg");
  commands.push(`1 0 0 1 ${page.marginX} 28 Tm`);
  commands.push(`(RemShield + Tenacious AI Marketing) Tj`);
  commands.push("ET");
  commands.push("BT");
  commands.push("/F1 8 Tf");
  commands.push("0.45 0.48 0.52 rg");
  commands.push(`1 0 0 1 ${page.width - page.marginX - 50} 28 Tm`);
  commands.push(`(Page ${pageNumber} of ${totalPages}) Tj`);
  commands.push("ET");

  return `${commands.join("\n")}\n`;
}

function createPdf(markdown, subtitle) {
  const paginated = paginate(markdown, subtitle);
  const objects = [];

  function addObject(content) {
    objects.push(content);
    return objects.length;
  }

  const catalogId = addObject("placeholder");
  const pagesId = addObject("placeholder");
  const fontRegularId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const fontMonoId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>");

  const pageIds = [];

  paginated.forEach((lines, index) => {
    const stream = contentStream(lines, index + 1, paginated.length);
    const contentId = addObject(`<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}endstream`);
    const pageId = addObject(
      [
        "<< /Type /Page",
        `/Parent ${pagesId} 0 R`,
        `/MediaBox [0 0 ${page.width} ${page.height}]`,
        `/Contents ${contentId} 0 R`,
        `/Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R /F3 ${fontMonoId} 0 R >> >>`,
        ">>",
      ].join("\n")
    );
    pageIds.push(pageId);
  });

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let output = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((content, index) => {
    offsets.push(Buffer.byteLength(output, "utf8"));
    output += `${index + 1} 0 obj\n${content}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(output, "utf8");
  output += `xref\n0 ${objects.length + 1}\n`;
  output += "0000000000 65535 f \n";

  for (let index = 1; index < offsets.length; index += 1) {
    output += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }

  output += "trailer\n";
  output += `<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\n`;
  output += "startxref\n";
  output += `${xrefOffset}\n`;
  output += "%%EOF\n";

  return Buffer.from(output, "utf8");
}

for (const document of documents) {
  const markdown = readFileSync(document.input, "utf8");
  const pdf = createPdf(markdown, document.subtitle);
  writeFileSync(document.output, pdf);
  console.log(`${document.output} (${pdf.length} bytes)`);
}
