import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTopbar from "../components/DashboardTopbar";
import Icon from "../components/Icon";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function AlertsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const dashboardUser = user ? {
    name: user.fullName,
    tier: "Premium Member",
    initials: user.fullName?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
    avatarUrl: user.avatarUrl,
  } : { name: "...", tier: "", initials: "?" };

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await api.get("/alerts");
        setAlerts(data.alerts || []);
      } catch {}
      finally { setLoading(false); }
    };
    fetchAlerts();
  }, []);

  const toggleEmailNotifications = async (id, current) => {
    try {
      await api.patch(`/alerts/${id}`, { emailEnabled: !current });
      setAlerts((prev) =>
        prev.map((a) => a.id === id ? { ...a, emailEnabled: !current } : a)
      );
    } catch (err) {
      alert(err.message || "Failed to update alert");
    }
  };

  const deleteAlert = async (id) => {
    setRemovingId(id);
    try {
      await api.delete(`/alerts/${id}`);
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
        setRemovingId(null);
      }, 300);
    } catch (err) {
      setRemovingId(null);
      alert(err.message || "Failed to delete alert");
    }
  };

  return (
    <div className="ml-64 min-h-screen">
      <DashboardTopbar searchPlaceholder="Search saved searches..." user={dashboardUser} />

      <main className="pt-24 pb-12 px-8 max-w-4xl mx-auto">
        <header className="mb-8">
          <h2 className="font-headline-md text-headline-md text-primary mb-2">Saved Alerts</h2>
          <p className="text-on-surface-variant font-body-md">
            Manage your property notifications and stay updated on the latest listings.
          </p>
        </header>

        <div className="bg-white rounded-xl property-shadow overflow-hidden border border-outline-variant/30">
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-surface-container rounded-lg animate-pulse" />
              ))}
            </div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-16 text-on-surface-variant">
              <Icon name="notifications_off" className="text-[48px] opacity-20 mb-3" />
              <p className="font-headline-sm">No alerts yet</p>
              <p className="text-sm mt-1 mb-6">Create an alert to get notified when matching properties are listed.</p>
            </div>
          ) : (
            alerts.map((alert, index) => (
              <div key={alert.id}>
                <div
                  className="flex items-center justify-between p-6 hover:bg-surface-container-low transition-all"
                  style={removingId === alert.id ? { opacity: 0.4, transform: "translateX(20px)" } : undefined}>
                  <div className="flex-grow">
                    <h3 className="font-headline-sm text-on-surface mb-1">{alert.name}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-on-surface-variant">
                      {alert.state && (
                        <span className="flex items-center gap-1">
                          <Icon name="location_on" className="text-xs text-primary" />
                          {alert.lga ? `${alert.lga}, ` : ""}{alert.state}
                        </span>
                      )}
                      {alert.minPrice && (
                        <span className="flex items-center gap-1 text-primary font-bold">
                          <Icon name="payments" className="text-xs" />
                          ₦{Number(alert.minPrice).toLocaleString()} – ₦{Number(alert.maxPrice || 0).toLocaleString()}
                        </span>
                      )}
                      {alert.minBedrooms && (
                        <span className="flex items-center gap-1">
                          <Icon name="bed" className="text-xs" />{alert.minBedrooms}+ beds
                        </span>
                      )}
                      {alert.listingType && (
                        <span>{alert.listingType.replace("_", " ")}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-on-surface-variant hidden sm:block">Email</span>
                      <button
                        role="switch"
                        aria-checked={alert.emailEnabled}
                        onClick={() => toggleEmailNotifications(alert.id, alert.emailEnabled)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          alert.emailEnabled ? "bg-primary" : "bg-surface-container-highest"
                        }`}>
                        <span className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-all ${
                          alert.emailEnabled ? "translate-x-5" : ""
                        }`} />
                      </button>
                    </div>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-all">
                      <Icon name="delete" />
                    </button>
                  </div>
                </div>
                {index < alerts.length - 1 && (
                  <div className="h-[1px] bg-outline-variant/30 mx-6" />
                )}
              </div>
            ))
          )}

          <div className="p-6 bg-surface-container-low/50 flex justify-center border-t border-outline-variant/30">
            <button
              onClick={() => navigate("/dashboard/alerts/new")}
              className="flex items-center gap-2 text-primary font-bold hover:underline transition-all">
              <Icon name="add_circle" />
              Create New Alert
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
