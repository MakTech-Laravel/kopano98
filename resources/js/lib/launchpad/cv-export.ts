import { jsPDF } from 'jspdf';

import type { CvDocument } from '@/data/launchpad/cv-document';
import { cvContactLine } from '@/data/launchpad/cv-document';
import type { LaunchpadTemplate } from '@/data/launchpad/templates';

function wrapText(
    doc: jsPDF,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
): number {
    const lines = doc.splitTextToSize(text || '—', maxWidth) as string[];

    for (const line of lines) {
        doc.text(line, x, y);
        y += lineHeight;
    }

    return y;
}

function fileSafeName(name: string): string {
    return (name || 'cv')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

export function exportCvPdf(
    document: CvDocument,
    template: LaunchpadTemplate,
    accent: string,
): void {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    const isTwoColumn = template.columns === 2;
    const sidebarWidth = isTwoColumn ? 160 : 0;
    const contentX = margin + sidebarWidth + (isTwoColumn ? 16 : 0);
    const contentWidth = pageWidth - contentX - margin;
    let y = margin;

    const rgb = hexToRgb(accent);

    if (isTwoColumn) {
        doc.setFillColor(rgb.r, rgb.g, rgb.b);
        doc.rect(0, 0, sidebarWidth + margin, pageHeight, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('CONTACT', margin, 48);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        y = wrapText(doc, cvContactLine(document), margin, 62, sidebarWidth - 8, 11);

        if (template.withPhoto && document.photoDataUrl) {
            try {
                doc.addImage(document.photoDataUrl, 'JPEG', margin, y + 8, 54, 54);
                y += 70;
            } catch {
                // Ignore unsupported image formats in jsPDF.
            }
        }

        y = Math.max(y, 140);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text('SKILLS', margin, y);
        y += 14;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);

        for (const skill of document.skills) {
            doc.text(`• ${skill}`, margin, y);
            y += 12;
        }

        y = margin;
    } else {
        doc.setFillColor(rgb.r, rgb.g, rgb.b);
        doc.rect(0, 0, pageWidth, 64, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text(document.name || 'Your Name', margin, 30);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(document.title || 'Professional title', margin, 48);

        if (template.withPhoto && document.photoDataUrl) {
            try {
                doc.addImage(
                    document.photoDataUrl,
                    'JPEG',
                    pageWidth - margin - 48,
                    10,
                    44,
                    44,
                );
            } catch {
                // Ignore unsupported image formats.
            }
        }

        y = 84;
        doc.setTextColor(51, 65, 85);
        doc.setFontSize(9);
        y = wrapText(doc, cvContactLine(document), margin, y, contentWidth, 12);
        y += 8;
    }

    const writeSection = (title: string, body: () => void) => {
        if (y > pageHeight - 80) {
            doc.addPage();
            y = margin;
        }

        doc.setTextColor(rgb.r, rgb.g, rgb.b);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(title, contentX, y);
        y += 14;
        doc.setTextColor(30, 41, 59);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        body();
        y += 10;
    };

    if (!isTwoColumn) {
        // already set contentX = margin
    }

    writeSection('Professional Summary', () => {
        y = wrapText(doc, document.summary, contentX, y, contentWidth, 13);
    });

    writeSection('Experience', () => {
        for (const role of document.experience) {
            if (y > pageHeight - 90) {
                doc.addPage();
                y = margin;
            }

            doc.setFont('helvetica', 'bold');
            doc.text(role.title || 'Role', contentX, y);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 116, 139);
            doc.setFontSize(9);
            doc.text(role.dates || '', pageWidth - margin, y, { align: 'right' });
            y += 12;
            doc.text(role.company || '', contentX, y);
            y += 12;
            doc.setTextColor(30, 41, 59);
            doc.setFontSize(10);
            y = wrapText(doc, role.description || '', contentX, y, contentWidth, 12);
            y += 8;
        }
    });

    if (document.education.length > 0) {
        writeSection('Education', () => {
            for (const item of document.education) {
                doc.setFont('helvetica', 'bold');
                doc.text(item.qualification || 'Qualification', contentX, y);
                y += 12;
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 116, 139);
                doc.setFontSize(9);
                doc.text(`${item.school} · ${item.dates}`, contentX, y);
                doc.setTextColor(30, 41, 59);
                doc.setFontSize(10);
                y += 14;
            }
        });
    }

    if (!isTwoColumn && document.skills.length > 0) {
        writeSection('Skills', () => {
            y = wrapText(doc, document.skills.join(' · '), contentX, y, contentWidth, 12);
        });
    }

    doc.save(`${fileSafeName(document.name) || 'cv'}-${template.id}.pdf`);
}

/**
 * Word-compatible HTML export. Uses table layout (no flex) for better
 * two-column fidelity in Microsoft Word.
 */
export function exportCvWord(
    document: CvDocument,
    template: LaunchpadTemplate,
    accent: string,
): void {
    const isTwoColumn = template.columns === 2;
    const contact = escapeHtml(cvContactLine(document));
    const photoHtml =
        template.withPhoto && document.photoDataUrl
            ? `<img src="${document.photoDataUrl}" width="72" height="72" alt="" />`
            : '';

    const skillsList = document.skills
        .map((skill) => `<li>${escapeHtml(skill)}</li>`)
        .join('');

    const experienceHtml = document.experience
        .map(
            (role) => `
      <p style="margin:0 0 2px 0;"><b>${escapeHtml(role.title)}</b>
        <span style="color:#64748b;"> — ${escapeHtml(role.dates)}</span></p>
      <p style="margin:0 0 4px 0;color:#475569;">${escapeHtml(role.company)}</p>
      <p style="margin:0 0 12px 0;">${escapeHtml(role.description)}</p>`,
        )
        .join('');

    const educationHtml = document.education
        .map(
            (item) => `
      <p style="margin:0 0 2px 0;"><b>${escapeHtml(item.qualification)}</b></p>
      <p style="margin:0 0 10px 0;color:#64748b;">${escapeHtml(item.school)} · ${escapeHtml(item.dates)}</p>`,
        )
        .join('');

    const sidebar = `
    <td width="34%" valign="top" bgcolor="${accent}" style="color:#ffffff;padding:18px;">
      ${photoHtml}
      <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;"><b>Contact</b></p>
      <p style="font-size:12px;">${contact}</p>
      <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;"><b>Skills</b></p>
      <ul style="font-size:12px;padding-left:16px;">${skillsList}</ul>
    </td>`;

    const main = `
    <td width="${isTwoColumn ? '66%' : '100%'}" valign="top" style="padding:18px;color:#0f172a;">
      <h1 style="margin:0 0 4px 0;color:${accent};font-size:22px;">${escapeHtml(document.name)}</h1>
      <p style="margin:0 0 12px 0;color:#64748b;">${escapeHtml(document.title)}</p>
      ${isTwoColumn ? '' : `<p style="margin:0 0 14px 0;color:#64748b;font-size:12px;">${contact}</p>`}
      ${template.withPhoto && !isTwoColumn ? photoHtml : ''}
      <h2 style="color:${accent};font-size:13px;text-transform:uppercase;">Professional Summary</h2>
      <p style="font-size:12px;">${escapeHtml(document.summary)}</p>
      <h2 style="color:${accent};font-size:13px;text-transform:uppercase;">Experience</h2>
      ${experienceHtml}
      <h2 style="color:${accent};font-size:13px;text-transform:uppercase;">Education</h2>
      ${educationHtml}
      ${
          isTwoColumn
              ? ''
              : `<h2 style="color:${accent};font-size:13px;text-transform:uppercase;">Skills</h2><ul style="font-size:12px;">${skillsList}</ul>`
      }
    </td>`;

    const html = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>${escapeHtml(document.name)} CV</title></head>
<body style="font-family:Calibri,Arial,sans-serif;">
  <table width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      ${isTwoColumn ? sidebar : ''}
      ${main}
    </tr>
  </table>
  <p style="font-size:10px;color:#94a3b8;">Template: ${escapeHtml(template.name)} · Launchpad Careers</p>
</body>
</html>`;

    const blob = new Blob(['\ufeff', html], {
        type: 'application/msword',
    });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${fileSafeName(document.name) || 'cv'}-${template.id}.doc`;
    link.click();
    URL.revokeObjectURL(url);
}

function escapeHtml(value: string): string {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const normalized = hex.replace('#', '');
    const value = Number.parseInt(normalized, 16);

    if (Number.isNaN(value)) {
        return { r: 13, g: 27, b: 42 };
    }

    return {
        r: (value >> 16) & 255,
        g: (value >> 8) & 255,
        b: value & 255,
    };
}
