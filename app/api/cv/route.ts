export const runtime = "nodejs";

function clean(text: string) {
  return text.replace(/[^\x20-\x7E]/g, "-")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

export async function GET() {
  const lines: string[] = [];
  let y = 747;
  const write = (text: string, font = "F1", size = 9.5, step = 14) => {
    lines.push("BT /" + font + " " + size + " Tf 48 " + y + " Td (" + clean(text) + ") Tj ET");
    y -= step;
  };
  const heading = (text: string) => {
    y -= 10;
    write(text.toUpperCase(), "F2", 10, 18);
  };
  const paragraph = (text: string) => {
    let current = "";
    for (const word of text.split(" ")) {
      if ((current + " " + word).length > 102) {
        write(current, "F1", 9.2, 13);
        current = word;
      } else current += (current ? " " : "") + word;
    }
    if (current) write(current, "F1", 9.2, 13);
  };

  write("KRISTIAN NOVAN", "F2", 23, 30);
  write("FRONTEND DEVELOPER | COMPUTER SCIENCE STUDENT", "F2", 10.5, 19);
  write("kristiannovan17@gmail.com | +62 895-7024-96980", "F1", 9.2, 14);
  write("github.com/krisvan123 | kristiannovan.vercel.app", "F1", 9.2, 16);

  heading("Profile");
  paragraph("Computer Science undergraduate at BINUS University, focusing on frontend development with React, Next.js and TypeScript. Interested in accessible interfaces, typed user input, API integration and collaborative software engineering.");

  heading("Technical skills");
  paragraph("Frontend: React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Zustand, TanStack Query.");
  paragraph("Additional: Python, Flask, SQLite, REST API integration, Git, GitHub, SQL fundamentals.");

  heading("Selected projects");
  write("FINPRO - Frontend Developer | Software Engineering Team Project", "F2", 10, 15);
  paragraph("Built and tested the transaction-entry frontend using React, Next.js and TypeScript. Worked with input validation, frontend state, and integration with backend REST endpoints. Tested data flow with dummy input on a separate Git branch.");
  y -= 7;
  write("WARUNGWISE - Independent Developer | Harvard CS50x Final Project", "F2", 10, 15);
  paragraph("Built an inventory management web app for Indonesian warungs with Python, Flask, Jinja templates and SQLite. Features include products, stock batches, FEFO expiry tracking, sales, restock guidance, reports and CSV export.");

  heading("Education");
  write("BINUS University - Computer Science", "F2", 10, 15);
  paragraph("Intelligent Systems concentration. Coursework undertaken in Semarang and Jakarta.");

  heading("Certificate");
  write("CS50x: Introduction to Computer Science - Harvard University (2026)", "F2", 10, 15);
  paragraph("Completed ten problem sets and one final project. Public verification: cs50.harvard.edu/certificates/1367ce9b-a33d-4f07-9450-6e1b5108a59e");

  lines.push("0.70 0.74 0.72 RG 0.7 w 48 42 m 564 42 l S");
  lines.push("BT /F1 8 Tf 48 27 Td (Updated November 2026) Tj ET");
  const stream = lines.join("\n") + "\n";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Length " + Buffer.byteLength(stream, "latin1") + " >>\nstream\n" + stream + "endstream",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += (i + 1) + " 0 obj\n" + objects[i] + "\nendobj\n";
  }
  const start = Buffer.byteLength(pdf, "latin1");
  pdf += "xref\n0 " + (objects.length + 1) + "\n0000000000 65535 f \n";
  for (const offset of offsets.slice(1)) pdf += String(offset).padStart(10, "0") + " 00000 n \n";
  pdf += "trailer\n<< /Size " + (objects.length + 1) + " /Root 1 0 R >>\nstartxref\n" + start + "\n%%EOF\n";
  return new Response(Buffer.from(pdf, "latin1"), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Kristian-Novan-CV.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
