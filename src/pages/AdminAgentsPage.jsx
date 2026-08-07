import { useState, useEffect } from "react";
import Icon from "../components/Icon";
import api from "../utils/api";

const STATUS_BADGE = {
  PENDING: "bg-secondary/10 text-secondary",
  APPROVED: "bg-primary/10 text-primary",
  REJECTED: "bg-error/10 text-error",
  SUSPENDED: "bg-surface-container-high text-on-surface-variant",
};

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(null);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: 50 });
      if (filter !== "all") params.set("status", filter.toUpperCase());
      const data = await api.get(`/agents?${params}`);
      setAgents(data.agents || []);
    } catch { setAgents([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAgents(); }, [filter]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await api.patch(`/agents/${id}/status`, { status });
      setAgents((prev) =>
        prev.map((a) => a.id === id
          ? { ...a, agentProfile: { ...a.agentProfile, status } }
          : a
        )
      );
    } catch (err) {
      alert(err.message || "Failed to update agent status");
    } finally { setUpdating(null); }
  };

  const filtered = agents.filter((a) =>
    a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    a.agentProfile?.agencyName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface">Agent Management</h2>
        <p className="text-on-surface-variant">Review and approve agent applications.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input type="text" placeholder="Search agents or agencies..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected", "suspended"].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full font-label-md text-sm capitalize whitespace-nowrap transition-colors ${
                filter === s ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl property-shadow overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-surface-container rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-md text-xs uppercase tracking-wider">
              <tr>
                {["Agent", "Agency", "Email", "Listings", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-4 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filtered.map((agent) => {
                const status = agent.agentProfile?.status || "PENDING";
                return (
                  <tr key={agent.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-on-surface text-sm">{agent.fullName}</p>
                      <p className="text-xs text-on-surface-variant">{agent.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">
                      {agent.agentProfile?.agencyName || "—"}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">{agent.email}</td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">
                      {agent.agentProfile?.totalListings || 0}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${STATUS_BADGE[status] || STATUS_BADGE.PENDING}`}>
                        {status.toLowerCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {status === "PENDING" && (
                          <>
                            <button
                              onClick={() => updateStatus(agent.id, "APPROVED")}
                              disabled={updating === agent.id}
                              className="px-3 py-1 bg-primary text-white text-xs rounded-full hover:opacity-90 disabled:opacity-50">
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(agent.id, "REJECTED")}
                              disabled={updating === agent.id}
                              className="px-3 py-1 bg-error text-white text-xs rounded-full hover:opacity-90 disabled:opacity-50">
                              Reject
                            </button>
                          </>
                        )}
                        {status === "APPROVED" && (
                          <button
                            onClick={() => updateStatus(agent.id, "SUSPENDED")}
                            disabled={updating === agent.id}
                            className="px-3 py-1 border border-error text-error text-xs rounded-full hover:bg-error/5 disabled:opacity-50">
                            Suspend
                          </button>
                        )}
                        {(status === "REJECTED" || status === "SUSPENDED") && (
                          <button
                            onClick={() => updateStatus(agent.id, "APPROVED")}
                            disabled={updating === agent.id}
                            className="px-3 py-1 border border-primary text-primary text-xs rounded-full hover:bg-primary/5 disabled:opacity-50">
                            Reinstate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-on-surface-variant">
                    <Icon name="search_off" className="text-[40px] opacity-20 mb-2" />
                    <p>No agents found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
