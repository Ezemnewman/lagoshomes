import { useState } from "react";
import DashboardTopbar from "../components/DashboardTopbar";
import AlertToggleSwitch from "../components/AlertToggleSwitch";
import Icon from "../components/Icon";
import { DASHBOARD_USER, SEED_SAVED_ALERTS, ALERT_RECOMMENDATIONS } from "../data/properties";

/**
 * Renders inside DashboardLayout's <Outlet>. Each alert's email toggle
 * and delete button are real React state, not the vanilla-JS DOM
 * removal the Stitch export used — deleting an alert here actually
 * removes it from this page's list, and toggling email notifications
 * persists per-alert (in-memory only, no backend yet to save it to).
 */
export default function AlertsPage() {
  const [alerts, setAlerts] = useState(SEED_SAVED_ALERTS);

  const toggleEmail = (id, enabled) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, emailEnabled: enabled } : a)));
    // TODO: PATCH /api/alerts/:id once backend exists
  };

  const deleteAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    // TODO: DELETE /api/alerts/:id once backend exists
  };

  return (
    <div className="ml-64 min-h-screen">
      <DashboardTopbar searchPlaceholder="Search saved searches..." user={DASHBOARD_USER} />

      <main className="pt-24 pb-12 px-8 max-w-4xl mx-auto">
        <header className="mb-10">
          <h2 className="font-headline-md text-headline-md text-primary mb-2">Saved Alerts</h2>
          <p className="text-body-md text-on-surface-variant">
            Manage your property notifications and stay updated on the latest listings.
          </p>
        </header>

        <div className="bg-white rounded-xl property-shadow overflow-hidden border border-outline-variant/30">
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <div key={alert.id}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-surface-container-low transition-colors">
                  <div className="flex-grow">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                      {alert.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      {alert.criteria.map((c) => (
                        <span
                          key={c.label}
                          className="flex items-center gap-1 text-label-md font-label-md text-on-surface-variant"
                        >
                          <Icon name={c.icon} className="text-[18px]" />
                          {c.label}
                        </span>
                      ))}
                      <span className="flex items-center gap-1 text-label-md font-label-md text-primary">
                        <Icon name="update" className="text-[18px]" />
                        {alert.frequency}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:gap-8">
                    <AlertToggleSwitch
                      checked={alert.emailEnabled}
                      onChange={(checked) => toggleEmail(alert.id, checked)}
                      label="Email Notifications"
                    />
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      aria-label={`Delete alert: ${alert.title}`}
                      className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-all"
                    >
                      <Icon name="delete" />
                    </button>
                  </div>
                </div>
                {index < alerts.length - 1 && <div className="h-[1px] bg-outline-variant/30 mx-6" />}
              </div>
            ))
          ) : (
            <p className="p-10 text-center text-on-surface-variant">
              No saved alerts yet. Create one to get notified about new matching listings.
            </p>
          )}

          <div className="p-6 bg-surface-container-low/50 flex justify-center border-t border-outline-variant/30">
            <button className="flex items-center gap-2 text-primary font-bold hover:underline transition-all">
              <Icon name="add_circle" />
              Create New Alert
              {/* TODO: open a real "create alert" form once one exists */}
            </button>
          </div>
        </div>

        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-headline-sm text-headline-sm text-on-surface">Recommended for You</h4>
            <a href="#" className="text-primary font-label-md text-label-md font-bold">
              View all matches
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {ALERT_RECOMMENDATIONS.map((rec) => (
              <div
                key={rec.id}
                className="bg-white rounded-xl property-shadow group cursor-pointer transition-all hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={rec.imageUrl}
                    alt={rec.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded text-[12px] font-bold">
                    {rec.badge}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-price-display font-price-display text-primary mb-2">
                    {rec.formattedPrice}
                  </p>
                  <h5 className="text-body-lg font-bold mb-1">{rec.title}</h5>
                  <p className="text-label-md text-on-surface-variant mb-4">{rec.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                    <div className="flex gap-3 text-on-surface-variant">
                      {rec.details.map((d) => (
                        <span key={d.label} className="flex items-center gap-1 text-[13px]">
                          <Icon name={d.icon} className="text-[18px]" />
                          {d.label}
                        </span>
                      ))}
                    </div>
                    <button className="text-primary hover:bg-primary/5 p-2 rounded-full transition-all" aria-label="Save to favorites">
                      <Icon name="favorite" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
