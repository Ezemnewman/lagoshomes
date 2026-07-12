import { useState } from "react";
import Icon from "../components/Icon";

const DEMO_AGENTS = [
  { id: "a1", name: "Emeka Okafor", email: "emeka@mail.com", phone: "08012345678", agency: "Prime Realty", status: "pending", submitted: "Jun 29, 2026", listings: 0 },
  { id: "a2", name: "Amaka Nwosu", email: "amaka@mail.com", phone: "09098765432", agency: "Amaka Properties", status: "pending", submitted: "Jun 28, 2026", listings: 0 },
  { id: "a3", name: "Tunde Bakare", email: "tunde@mail.com", phone: "08011112222", agency: "Prime Lagos Realty", status: "approved", submitted: "Jun 01, 2026", listings: 18 },
  { id: "a4", name: "Bola Adeyemi", email: "bola@mail.com", phone: "07033334444", agency: "Adeyemi Homes", status: "approved", submitted: "May 15, 2026", listings: 7 },
  { id: "a5", name: "Kemi Olu", email: "kemi@mail.com", phone: "08055556666", agency: "Kemi Properties", status: "rejected", submitted: "Jun 20, 2026", listings: 0 },
];

const STATUS_BADGE = {
  pending: "bg-secondary/10 text-secondary",
  approved: "bg-primary/10 text-primary",
  rejected: "bg-error/10 text-error",
};

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState(DEMO_AGENTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const updateStatus = (id, status) => {
    setAgents((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
    // TODO: PATCH /api/admin/agents/:id/status once backend exists
  };

  const filtered = agents.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.agency.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface">Agent Management</h2>
        <p className="text-on-surface-variant">Review and approve agent applications.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            placeholder="Search agents or agencies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full font-label-md text-label-md capitalize ${filter === s ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl property-shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
            <tr>
              {["Agent", "Agency", "Submitted", "Listings", "Status", "Actions"].map((h) => (
                <th key={h} className="px-6 py-4 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {filtered.map((agent) => (
              <tr key={agent.id} className="hover:bg-surface-container/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-on-surface">{agent.name}</p>
                  <p className="text-xs text-on-surface-variant">{agent.email}</p>
                </td>
                <td className="px-6 py-4 text-on-surface-variant">{agent.agency}</td>
                <td className="px-6 py-4 text-on-surface-variant text-sm">{agent.submitted}</td>
                <td className="px-6 py-4 text-on-surface-variant">{agent.listings}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${STATUS_BADGE[agent.status]}`}>
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {agent.status === "pending" && (
                      <>
                        <button onClick={() => updateStatus(agent.id, "approved")} className="px-3 py-1.5 bg-primary text-white text-xs rounded-full hover:opacity-90 transition-all">Approve</button>
                        <button onClick={() => updateStatus(agent.id, "rejected")} className="px-3 py-1.5 bg-error text-white text-xs rounded-full hover:opacity-90 transition-all">Reject</button>
                      </>
                    )}
                    {agent.status === "approved" && (
                      <button onClick={() => updateStatus(agent.id, "rejected")} className="px-3 py-1.5 border border-error text-error text-xs rounded-full hover:bg-error/5 transition-all">Suspend</button>
                    )}
                    {agent.status === "rejected" && (
                      <button onClick={() => updateStatus(agent.id, "approved")} className="px-3 py-1.5 border border-primary text-primary text-xs rounded-full hover:bg-primary/5 transition-all">Reinstate</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant">
            <Icon name="search_off" className="text-[40px] opacity-30 mb-2" />
            <p>No agents match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
