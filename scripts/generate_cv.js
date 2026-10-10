const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function generateCV() {
  const htmlPath = path.resolve(__dirname, 'cv_template.html');
  const pdfPath = path.resolve(__dirname, '..', 'public', 'cv', 'Kristian-Novan-CV.pdf');

  // Candidate Chrome/Edge binaries
  const browserPaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'chrome',
    'msedge'
  ];

  let browserExecutable = null;
  for (const p of browserPaths) {
    if (fs.existsSync(p)) {
      browserExecutable = p;
      break;
    }
  }

  if (!browserExecutable) {
    console.warn('No headless browser found to compile CV. Keeping existing PDF.');
    return;
  }

  try {
    const cmd = `"${browserExecutable}" --headless --disable-gpu --no-pdf-header-footer "--print-to-pdf=${pdfPath}" "${htmlPath}"`;
    execSync(cmd, { stdio: 'inherit' });
    console.log('Successfully generated CV PDF at:', pdfPath, 'Bytes:', fs.statSync(pdfPath).size);
  } catch (err) {
    console.error('Error generating CV PDF:', err.message);
  }
}

generateCV();
