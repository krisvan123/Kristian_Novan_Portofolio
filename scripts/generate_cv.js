const fs = require('fs');
const path = require('path');

// Generate an ATS-compliant, valid PDF 1.4 document for Kristian Novan
function generateCV() {
  const outputPath = path.join(__dirname, '..', 'public', 'cv', 'Kristian-Novan-CV.pdf');

  // Helper to escape PDF strings
  function esc(str) {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  // Stream content instructions
  const ops = [];

  // Colors
  const black = '0 0 0 rg';
  const navy = '0.1 0.22 0.45 rg';
  const gray = '0.35 0.35 0.4 rg';
  const charcoal = '0.15 0.15 0.18 rg';
  const lineGray = '0.8 0.8 0.82 RG';

  // Margins & Dimensions (Letter: 612 x 792 pt)
  const left = 50;
  let y = 745;

  function drawLine(yPos) {
    ops.push(`${lineGray} 1 w ${left} ${yPos} m 562 ${yPos} l S`);
  }

  // 1. Header: Name & Contact
  ops.push(`BT /F2 22 Tf ${navy} ${left} ${y} Td (${esc('KRISTIAN NOVAN')}) Tj ET`);
  y -= 16;
  ops.push(`BT /F1 10 Tf ${gray} ${left} ${y} Td (${esc('Computer Science Undergraduate | Intelligent Systems (AI) Specialization')}) Tj ET`);
  y -= 14;
  ops.push(`BT /F1 9 Tf ${charcoal} ${left} ${y} Td (${esc('Jakarta, Indonesia  |  Email: kristiannovan17@gmail.com  |  LinkedIn: linkedin.com/in/kristian-n-195031328  |  GitHub: github.com/krisvan123')}) Tj ET`);
  y -= 10;
  drawLine(y);
  y -= 16;

  // 2. Summary
  ops.push(`BT /F2 11 Tf ${navy} ${left} ${y} Td (${esc('PROFESSIONAL SUMMARY & AVAILABILITY')}) Tj ET`);
  y -= 13;
  ops.push(`BT /F1 9 Tf ${charcoal} ${left} ${y} Td (${esc('Computer Science student at BINUS University (B2028), specializing in Intelligent Systems (AI) during Semesters 4-5.')}) Tj ET`);
  y -= 11;
  ops.push(`BT /F1 9 Tf ${charcoal} ${left} ${y} Td (${esc('Passionate about connecting technical rigor in Machine Learning with human-centered UI/UX design. Open to internship and')}) Tj ET`);
  y -= 11;
  ops.push(`BT /F1 9 Tf ${charcoal} ${left} ${y} Td (${esc('work opportunities in AI systems, full-stack software development, and UI/UX product engineering.')}) Tj ET`);
  y -= 12;
  drawLine(y);
  y -= 16;

  // 3. Education
  ops.push(`BT /F2 11 Tf ${navy} ${left} ${y} Td (${esc('EDUCATION')}) Tj ET`);
  y -= 13;
  ops.push(`BT /F2 9.5 Tf ${charcoal} ${left} ${y} Td (${esc('BINUS University')} ) Tj /F1 9 Tf (${esc('— School of Computer Science (SOCS)')}) Tj ET`);
  ops.push(`BT /F1 9 Tf ${gray} 440 ${y} Td (${esc('Jakarta, Indonesia')}) Tj ET`);
  y -= 11;
  ops.push(`BT /F1 9 Tf ${charcoal} ${left} ${y} Td (${esc('Bachelor of Computer Science (B2028) | Specialization: Intelligent Systems (AI), Semesters 4-5')}) Tj ET`);
  ops.push(`BT /F1 9 Tf ${gray} 440 ${y} Td (${esc('Expected Grad: 2028')}) Tj ET`);
  y -= 12;
  drawLine(y);
  y -= 16;

  // 4. Technical & Soft Skills
  ops.push(`BT /F2 11 Tf ${navy} ${left} ${y} Td (${esc('TECHNICAL & INTERPERSONAL SKILLS')}) Tj ET`);
  y -= 13;
  ops.push(`BT /F2 9 Tf ${charcoal} ${left} ${y} Td (${esc('Languages & Frameworks: ')}) Tj /F1 9 Tf (${esc('Python, Next.js, React, TypeScript, JavaScript, Tailwind CSS, HTML5/CSS3')}) Tj ET`);
  y -= 11;
  ops.push(`BT /F2 9 Tf ${charcoal} ${left} ${y} Td (${esc('AI & Machine Learning: ')}) Tj /F1 9 Tf (${esc('Scikit-Learn, PyTorch, Computer Vision, Natural Language Processing (NLP), Regression, Heuristics')}) Tj ET`);
  y -= 11;
  ops.push(`BT /F2 9 Tf ${charcoal} ${left} ${y} Td (${esc('Design & Tools: ')}) Tj /F1 9 Tf (${esc('Figma (UI/UX, Prototyping, Wireframing), Git, GitHub, VS Code, Cloud AI (Microsoft Azure)')}) Tj ET`);
  y -= 11;
  ops.push(`BT /F2 9 Tf ${charcoal} ${left} ${y} Td (${esc('Interpersonal & Creative: ')}) Tj /F1 9 Tf (${esc('Master of Ceremony (Public Speaking), Mentorship, Team Leadership, Choir, Theater Arts')}) Tj ET`);
  y -= 12;
  drawLine(y);
  y -= 16;

  // 5. Selected Projects
  ops.push(`BT /F2 11 Tf ${navy} ${left} ${y} Td (${esc('FEATURED ACADEMIC & COMPETITION PROJECTS')}) Tj ET`);
  y -= 14;

  const projects = [
    {
      title: 'EcoRouter AI — Dynamic Load Routing Optimization',
      tech: 'Python, Heuristic Optimization, Green Logistics',
      points: [
        'Modeled vehicle routing optimization for CompFest AI Competition under dynamic parcel weight reduction constraints.',
        'Calculated sequential transit mass savings to identify delivery sequences that minimize total fuel burn and carbon emissions.'
      ]
    },
    {
      title: 'AirSense Dashboard — PM2.5 Environmental Predictor',
      tech: 'Python, Machine Learning, Regression, WHO Datasets',
      points: [
        'Built regression prediction pipeline estimating PM2.5 particulate concentration from macro environmental indicators.',
        'Provided sensor-free air quality assessment interface enabling regional parameter analysis based on historical WHO data.'
      ]
    },
    {
      title: 'Skinical — Hybrid Lesion Classifier & Web Interface',
      tech: 'Computer Vision, Deep Learning, Classical ML, Web UI',
      points: [
        'Comparative study evaluating classical feature descriptors vs. hybrid deep representations for skin lesion screening.',
        'Designed lightweight web application interface for diagnostic result inspection and non-invasive screening support.'
      ]
    },
    {
      title: 'FinPro — Personal Financial Management Platform',
      tech: 'Software Engineering, Full-Stack Architecture, System Design, UI/UX',
      points: [
        'Engineered personal budget tracker emphasizing modular design patterns and intuitive day-to-day money management flows.'
      ]
    },
    {
      title: 'Travel Application — HCI & Mobile Prototype',
      tech: 'Figma, Human-Computer Interaction, UI/UX Design System',
      points: [
        'Applied cognitive load minimization and user flow principles to design a high-fidelity travel itinerary planner in Figma.'
      ]
    }
  ];

  projects.forEach((proj) => {
    ops.push(`BT /F2 9.5 Tf ${charcoal} ${left} ${y} Td (${esc(proj.title)}) Tj ET`);
    ops.push(`BT /F1 8.5 Tf ${gray} 370 ${y} Td (${esc(proj.tech)}) Tj ET`);
    y -= 11;
    proj.points.forEach((pt) => {
      ops.push(`BT /F1 8.5 Tf ${charcoal} ${left + 10} ${y} Td (${esc('•  ' + pt)}) Tj ET`);
      y -= 10;
    });
    y -= 3;
  });

  drawLine(y);
  y -= 16;

  // 6. Experience & Verified Credentials
  ops.push(`BT /F2 11 Tf ${navy} ${left} ${y} Td (${esc('CREDENTIALS, LEADERSHIP & CAMPUS EXPERIENCE')}) Tj ET`);
  y -= 13;

  const expItems = [
    { title: 'ICORIS 2026 Paper Author', issuer: 'IEEE Indonesia Section & UTB — Peer-reviewed research publication presenter' },
    { title: 'CompFest AIC 2026 Top 41 Finalist', issuer: 'Universitas Indonesia — National AI Machine Learning Competition' },
    { title: 'Microsoft Azure AI Fundamentals', issuer: 'Microsoft & GreatNusa — Cloud AI, Computer Vision & NLP Credential' },
    { title: 'HIMTI Staff of Mentor Division', issuer: 'HIMTI BINUS — Guided junior students in committee leadership preparation' },
    { title: 'Techno Event Master of Ceremony (MC)', issuer: 'PTK Techno Committee — Stage host, audience engagement, and logistics' },
    { title: 'WALUBI Volunteer Service (Waisak 2025)', issuer: 'DPD WALUBI Jateng — Medical logistics and humanitarian service at Candi Borobudur' }
  ];

  for (let i = 0; i < expItems.length; i += 2) {
    const item1 = expItems[i];
    const item2 = expItems[i + 1];

    ops.push(`BT /F2 8.5 Tf ${charcoal} ${left} ${y} Td (${esc('• ' + item1.title)}: ) Tj /F1 8 Tf ${gray} (${esc(item1.issuer)}) Tj ET`);
    y -= 10;
    if (item2) {
      ops.push(`BT /F2 8.5 Tf ${charcoal} ${left} ${y} Td (${esc('• ' + item2.title)}: ) Tj /F1 8 Tf ${gray} (${esc(item2.issuer)}) Tj ET`);
      y -= 10;
    }
  }

  const streamContent = ops.join('\n');
  const streamLength = Buffer.byteLength(streamContent, 'utf-8');

  // Build PDF 1.4 Object Structure
  const objects = [];
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
  objects[3] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>';
  objects[4] = `<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream`;
  objects[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  objects[6] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';

  let output = '%PDF-1.4\n';
  const offsets = [];

  for (let i = 1; i <= 6; i++) {
    offsets[i] = Buffer.byteLength(output, 'utf-8');
    output += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const startxref = Buffer.byteLength(output, 'utf-8');
  output += 'xref\n0 7\n0000000000 65535 f \n';

  for (let i = 1; i <= 6; i++) {
    const offsetStr = String(offsets[i]).padStart(10, '0');
    output += `${offsetStr} 00000 n \n`;
  }

  output += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  fs.writeFileSync(outputPath, output, 'binary');
  console.log('Successfully generated CV PDF at:', outputPath, 'Bytes:', fs.statSync(outputPath).size);
}

generateCV();
