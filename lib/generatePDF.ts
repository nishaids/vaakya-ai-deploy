interface SummaryData {
  type: string;
  parties: string[];
  date: string;
  duration: string;
}

interface ViolationData {
  severity: string;
  title: string;
  description: string;
  law: string;
  amount_recoverable: string;
}

interface RightData {
  title: string;
  description: string;
  law: string;
}

interface ActionData {
  title: string;
  type: string;
  description: string;
  url?: string;
}

function getCurrentDate(): string {
  return new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function generateLegalNoticeHTML(
  action: ActionData,
  summary: SummaryData,
  violations: ViolationData[]
): string {
  const currentDate = getCurrentDate();
  const recipientParty = summary.parties[0] || "Opposite Party";
  const senderParty = summary.parties[1] || "Complainant";
  const lawCitation = violations[0]?.law || "Applicable Indian Laws";
  const timestamp = Date.now();

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>VAAKYA AI - Legal Notice</title>
<style>
  body { font-family: 'Times New Roman', serif; margin: 60px; color: #000; }
  .header { text-align: center; margin-bottom: 40px; }
  .title { font-size: 20px; font-weight: bold; text-decoration: underline; text-transform: uppercase; letter-spacing: 2px; }
  .date { text-align: right; font-size: 14px; margin-bottom: 30px; }
  .to-section { margin-bottom: 20px; }
  .label { font-weight: bold; font-size: 13px; text-transform: uppercase; }
  .body-text { font-size: 14px; line-height: 1.8; margin: 20px 0; }
  .clause { margin: 15px 0; padding-left: 20px; }
  .footer { margin-top: 60px; }
  .signature-line { border-top: 1px solid #000; width: 200px; margin-top: 60px; }
  .watermark { color: #8B5CF6; font-weight: bold; }
</style>
</head>
<body>
  <div class="header">
    <div style="font-size:24px;font-weight:bold;color:#4B0082;">VAAKYA AI</div>
    <div style="font-size:11px;color:#666;">Autonomous Legal Rights Protection System</div>
    <div class="title" style="margin-top:20px;">Legal Notice</div>
  </div>
  
  <div class="date">Date: ${currentDate}</div>
  
  <div class="to-section">
    <div class="label">To,</div>
    <div style="margin-top:8px;font-size:14px;">${recipientParty}</div>
    <div style="font-size:13px;color:#555;">Respondent / Opposite Party</div>
  </div>
  
  <div class="to-section" style="margin-top:20px;">
    <div class="label">From,</div>
    <div style="margin-top:8px;font-size:14px;">${senderParty}</div>
    <div style="font-size:13px;color:#555;">Complainant / Notice Sender</div>
  </div>

  <div class="body-text">
    <strong>Subject: Legal Notice for ${action.title} — Demand for Immediate Compliance</strong>
  </div>

  <div class="body-text">
    Under instructions from and on behalf of my client <strong>${senderParty}</strong> 
    (hereinafter referred to as "the Complainant"), I hereby serve upon you this 
    legal notice as follows:
  </div>

  <div class="clause">
    <strong>1. FACTS OF THE MATTER:</strong><br/>
    ${action.description}. The Complainant has been adversely affected by the above 
    actions/omissions on your part, which are in direct violation of applicable 
    Indian laws and regulations.
  </div>

  <div class="clause">
    <strong>2. LEGAL VIOLATIONS:</strong><br/>
    Your actions are in violation of <strong>${lawCitation}</strong>. 
    The said act/omission constitutes a clear deficiency in service and/or 
    unfair trade practice as defined under the Consumer Protection Act, 2019.
  </div>

  <div class="clause">
    <strong>3. DEMAND:</strong><br/>
    You are hereby called upon to comply with the following within 
    <strong>15 (fifteen) days</strong> from the date of receipt of this notice:<br/>
    (a) ${action.description}<br/>
    (b) Pay damages and/or compensation as applicable under law<br/>
    (c) Provide written acknowledgment of compliance
  </div>

  <div class="clause">
    <strong>4. CONSEQUENCES OF NON-COMPLIANCE:</strong><br/>
    Please be informed that in case you fail to comply with the above demand 
    within the stipulated time, my client shall be constrained to initiate 
    appropriate legal proceedings before the competent Consumer Disputes 
    Redressal Forum/Court and/or relevant regulatory authority, entirely 
    at your risk and costs.
  </div>

  <div class="body-text">
    This notice is being served without prejudice to all other rights and 
    remedies available to my client under law.
  </div>

  <div class="footer">
    <div>Yours faithfully,</div>
    <div class="signature-line"></div>
    <div style="margin-top:8px;font-weight:bold;">${senderParty}</div>
    <div style="font-size:12px;color:#555;">Generated via VAAKYA AI — Autonomous Legal Protection System</div>
    <div style="font-size:11px;color:#8B5CF6;margin-top:4px;">
      Document Reference: VAAKYA-${timestamp} | Date: ${currentDate}
    </div>
  </div>
</body>
</html>`;
}

export function downloadLegalNotice(
  action: ActionData,
  summary: SummaryData,
  violations: ViolationData[]
): void {
  const htmlString = generateLegalNoticeHTML(action, summary, violations);
  const blob = new Blob([htmlString], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `VAAKYA-Legal-Notice-${Date.now()}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

function generateFullReportHTML(
  summary: SummaryData,
  violations: ViolationData[],
  rights: RightData[],
  legalActions: ActionData[]
): string {
  const currentDate = getCurrentDate();
  const timestamp = Date.now();
  const totalRecoverable = violations.reduce((sum, v) => {
    const match = v.amount_recoverable.match(/₹([\d,]+)/);
    if (match) {
      return sum + parseInt(match[1].replace(/,/g, ""), 10);
    }
    return sum;
  }, 0);

  const violationsHTML = violations
    .map(
      (v) => `
    <div style="margin-bottom:20px;padding:16px 20px;border-left:4px solid ${v.severity === "ILLEGAL" ? "#EF4444" : v.severity === "SUSPICIOUS" ? "#F59E0B" : "#EAB308"};background:${v.severity === "ILLEGAL" ? "rgba(239,68,68,0.05)" : v.severity === "SUSPICIOUS" ? "rgba(245,158,11,0.05)" : "rgba(234,179,8,0.05)"};border-radius:8px;">
      <div style="font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:${v.severity === "ILLEGAL" ? "#EF4444" : v.severity === "SUSPICIOUS" ? "#F59E0B" : "#EAB308"};margin-bottom:6px;">${v.severity}</div>
      <div style="font-size:15px;font-weight:bold;margin-bottom:8px;">${v.title}</div>
      <div style="font-size:13px;color:#555;line-height:1.7;">${v.description}</div>
      <div style="font-size:12px;color:#888;margin-top:8px;font-family:monospace;">⚖ ${v.law}</div>
      ${v.amount_recoverable ? `<div style="font-size:13px;margin-top:6px;">💰 Recoverable: <strong style="color:#10B981;">${v.amount_recoverable}</strong></div>` : ""}
    </div>`
    )
    .join("");

  const rightsHTML = rights
    .map(
      (r) => `
    <div style="margin-bottom:16px;padding:16px 20px;border-left:4px solid #10B981;background:rgba(16,185,129,0.05);border-radius:8px;">
      <div style="font-size:15px;font-weight:bold;margin-bottom:6px;">✅ ${r.title}</div>
      <div style="font-size:13px;color:#555;line-height:1.7;">${r.description}</div>
      <div style="font-size:12px;color:#888;margin-top:6px;font-family:monospace;">⚖ ${r.law}</div>
    </div>`
    )
    .join("");

  const actionsHTML = legalActions
    .map(
      (a) => `
    <div style="margin-bottom:12px;padding:14px 18px;border:1px solid rgba(139,92,246,0.2);background:rgba(139,92,246,0.05);border-radius:8px;">
      <div style="font-size:14px;font-weight:bold;">⚡ ${a.title}</div>
      <div style="font-size:12px;color:#555;margin-top:4px;">${a.description}</div>
      <div style="font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#8B5CF6;margin-top:6px;">${a.type} — ACTION READY</div>
    </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>VAAKYA AI - Full Legal Analysis Report</title>
<style>
  body { font-family: 'Times New Roman', serif; margin: 0; color: #1a1a2e; }
  .cover { page-break-after: always; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; }
  .cover-watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); font-size: 80px; font-weight: bold; color: rgba(200,200,200,0.15); letter-spacing: 20px; white-space: nowrap; pointer-events: none; }
  .content { padding: 40px 60px; }
  .section { margin-bottom: 36px; }
  .section-title { font-size: 18px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 2px solid #8B5CF6; padding-bottom: 8px; margin-bottom: 20px; }
  .summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .summary-item { padding: 12px; background: #f5f5f5; border-radius: 6px; }
  .summary-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #888; }
  .summary-value { font-size: 14px; font-weight: bold; margin-top: 4px; font-family: monospace; }
</style>
</head>
<body>
  <div class="cover">
    <div class="cover-watermark">CONFIDENTIAL</div>
    <div style="font-size:36px;font-weight:bold;color:#4B0082;">VAAKYA AI</div>
    <div style="font-size:12px;color:#666;margin-bottom:30px;">Autonomous Legal Rights Protection System</div>
    <div style="font-size:28px;font-weight:bold;text-decoration:underline;text-transform:uppercase;letter-spacing:3px;margin-bottom:40px;">Legal Analysis Report</div>
    <div style="font-size:16px;margin-bottom:8px;"><strong>Document Type:</strong> ${summary.type}</div>
    <div style="font-size:14px;color:#555;margin-bottom:4px;">${summary.parties.join(" & ")}</div>
    <div style="font-size:14px;color:#555;margin-bottom:4px;">Date: ${summary.date}</div>
    <div style="font-size:14px;color:#555;margin-bottom:30px;">Reference: ${summary.duration}</div>
    <div style="display:inline-block;padding:12px 24px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:8px;margin:8px;">
      <strong style="color:#EF4444;">${violations.length} Violations Found</strong>
    </div>
    <div style="display:inline-block;padding:12px 24px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:8px;margin:8px;">
      <strong style="color:#10B981;">${rights.length} Rights Protected</strong>
    </div>
    ${totalRecoverable > 0 ? `<div style="display:inline-block;padding:12px 24px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:8px;margin:8px;">
      <strong style="color:#D97706;">₹${totalRecoverable.toLocaleString("en-IN")} Recoverable</strong>
    </div>` : ""}
    <div style="position:absolute;bottom:40px;font-size:11px;color:#999;">
      Generated: ${currentDate} | Document Ref: VAAKYA-${timestamp}
    </div>
  </div>

  <div class="content">
    <div class="section">
      <div class="section-title">Document Summary</div>
      <div class="summary-grid">
        <div class="summary-item">
          <div class="summary-label">Type</div>
          <div class="summary-value">${summary.type}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Parties</div>
          <div class="summary-value">${summary.parties.join(" | ")}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Date</div>
          <div class="summary-value">${summary.date}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Reference</div>
          <div class="summary-value">${summary.duration}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title" style="border-color:#EF4444;">Violations Detected (${violations.length})</div>
      ${violationsHTML}
    </div>

    <div class="section">
      <div class="section-title" style="border-color:#10B981;">Your Rights (${rights.length})</div>
      ${rightsHTML}
    </div>

    <div class="section">
      <div class="section-title" style="border-color:#8B5CF6;">Legal Actions Ready</div>
      ${actionsHTML}
    </div>

    <div style="margin-top:60px;text-align:center;font-size:11px;color:#999;">
      <div style="font-size:20px;font-weight:bold;color:#4B0082;">VAAKYA AI</div>
      <div>Autonomous Legal Rights Protection System</div>
      <div style="margin-top:8px;">Document Reference: VAAKYA-${timestamp} | Generated: ${currentDate}</div>
    </div>
  </div>
</body>
</html>`;
}

export function downloadFullReport(
  summary: SummaryData,
  violations: ViolationData[],
  rights: RightData[],
  legalActions: ActionData[]
): void {
  const htmlString = generateFullReportHTML(
    summary,
    violations,
    rights,
    legalActions
  );
  const blob = new Blob([htmlString], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `VAAKYA-Full-Report-${Date.now()}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
