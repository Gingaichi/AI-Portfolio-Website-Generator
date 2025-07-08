export function downloadHtmlFile(innerHtml: string, filename = 'portfolio.html') {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>My Portfolio</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; background: white; color: black; }
            .skill { display: inline-block; margin: 0.25rem; padding: 0.25rem 0.75rem; background: #eee; border-radius: 9999px; }
            .project { margin-bottom: 1rem; border: 1px solid #ddd; padding: 1rem; border-radius: 0.5rem; }
          </style>
        </head>
        <body>
          ${innerHtml}
        </body>
      </html>
    `;
  
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  