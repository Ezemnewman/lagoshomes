import { useState } from "react";
import Icon from "../components/Icon";

const DEMO_REPORTS = [
  { id: "R001", type: "fake", reporter: "Ade Okon", against: "Listing #L004 — Suspicious Land Plot", reason: "Fake/Scam Listing", detail: "This plot doesn't exist. Verified by visiting the site.", submitted: "Jun 28, 2026", status: "open" },
  { id: "R002", type: "wrong_details", reporter: "Ngozi Eze", against: "Listing #L002 — 3 Bedroom Flat", reason: "Wrong Price or Details", detail: "Actual price quoted in person was 10M higher than listed.", submitted: "Jun 27, 2026", status: "open" },
  { id: "R003", type: "inappropriate", reporter: "Musa Danladi", against: "Agent Kemi Olu", reason: "Inappropriate Conduct", detail: "Agent asked for cash upfront before showing the property.", submitted: "Jun 25, 2026", status: "resolved" },
  { id: "R004", type: "sold", reporter: "Chioma Obi", against: "Listing #L001 — Luxury Duplex", reason: "Property Already Sold", detail: "I inquired and was told this property sold 2 months ago.", submitted: "Jun 26, 2026", status: "dismissed" },
];

const STATUS_STYLES = {
  open: "bg-secondary/10 text-secondary",
  resolved: "bg-primary/10 text-primary",
  dismissed: "bg-surface-container-high text-on-surface-variant",
  escalated: "bg-error/10 text-error",
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState(DEMO_REPORTS);
  const [filter, setFilter] = useState("all");

  const updateStatus = (id, status) => {
    setReports((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    // TODO: PATCH /api/admin/reports/:id once backend exists
  };

  const filtered = filter === "all" ? reports : reports.filter((r) => r.status === filter);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface">User Reports</h2>
        <p className="text-on-surface-variant">Review and resolve user-submitted reports on listings and agents.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", "open", "escalated", "resolved", "dismissed"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full font-label-md text-label-md capitalize transition-colors ${filter === s ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"}`}>
            {s === "all" ? "All Reports" : s}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((report) => (
          <div key={report.id} className="bg-white rounded-xl property-shadow p-6 border border-outline-variant/20">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-on-surface-variant">{report.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${STATUS_STYLES[report.status]}`}>
                    {report.status}
                  </span>
                </div>
                <h3 className="font-label-md text-label-md font-bold text-on-surface">{report.reason}</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Reported by <strong>{report.reporter}</strong> • {report.submitted}
                </p>
              </div>
              <div className="flex gap-2">
                {report.status === "open" && (
                  <>
                    <button onClick={() => updateStatus(report.id, "escalated")} className="px-3 py-1 border border-error text-error text-xs rounded-full hover:bg-error/5">Escalate</button>
                    <button onClick={() => updateStatus(report.id, "resolved")} className="px-3 py-1 bg-primary text-white text-xs rounded-full hover:opacity-90">Resolve</button>
                    <button onClick={() => updateStatus(report.id, "dismissed")} className="px-3 py-1 bg-surface-container text-on-surface-variant text-xs rounded-full hover:bg-surface-variant">Dismiss</button>
                  </>
                )}
                {(report.status === "resolved" || report.status === "dismissed") && (
                  <button onClick={() => updateStatus(report.id, "open")} className="px-3 py-1 border border-outline-variant text-on-surface-variant text-xs rounded-full hover:bg-surface-container">Reopen</button>
                )}
              </div>
            </div>
            <div className="bg-surface-container-low rounded-lg p-3 mb-3">
              <p className="font-label-md text-label-md text-on-surface-variant font-semibold mb-1">Against</p>
              <p className="font-body-md text-body-md text-on-surface">{report.against}</p>
            </div>
            <p className="text-on-surface-variant font-body-md text-sm italic">"{report.detail}"</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant bg-white rounded-xl property-shadow">
            <Icon name="flag" className="text-[40px] opacity-20 mb-2" />
            <p>No reports in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
