import { useState } from "react";
import Icon from "../components/Icon";
import { AGENT_DASHBOARD_USER } from "../data/properties";

const DEMO_CONVERSATIONS = [
  {
    id: "c1",
    buyerName: "Chioma Obi",
    buyerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBg2bSHqkZ__4wZRcMBoHDk1P1eFxXsEE4BVdo2oTJ9Ky02NFYrA-0_aSRvOWX6Qz2ifW-rOB17iKyRmnkWDGFLEmg98pMQoVy5Vf3ieqSQuHGYcMB12q51jTXONCahLFBT5CLFM8IE19XgqJC2-_ESVYOV-P_FwzjgC121ngMm8JqJIWwnTLAhkKAoFvc6ZqBhlZ7tK-keyGSh6yGL3GJwD30YZ6WzN2cB8uhRsrZk2j4l4doljB87lqbEABDj1_DOhmDSLWjDAMC",
    propertyTitle: "Luxury 4 Bedroom Duplex",
    lastMessage: "Is the price still negotiable?",
    time: "2h ago",
    unread: 2,
    messages: [
      { id: "m1", from: "buyer", text: "Hello, I'm interested in the Luxury 4 Bedroom Duplex.", time: "10:00 AM" },
      { id: "m2", from: "agent", text: "Great! It's a fantastic property. What would you like to know?", time: "10:05 AM" },
      { id: "m3", from: "buyer", text: "Is the price still negotiable?", time: "10:10 AM" },
    ],
  },
  {
    id: "c2",
    buyerName: "Segun Williams",
    buyerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8bC7oSkCE4eSm2lObjaS2uwlvpQaL_unTUkTEiD8hUwKZd_CMFz_xEbZeY1ynQaLGGEwE4U2wU3j8jt3khx6ff_UPpokm0YgNH1eF931IIzOMeJ61knAAr4dPXJDO7ocOxUZCp-o4DxhlfagGuS_ifEMFKg_Ke1D83MZkPR8jN-JwI4P53vk8RWdeZYtSVqzdyyvQfOU9jDE3UdacOtj4eoQYJwmop_2wlWrGiFERibkelkCwyxBRrv38UYK47__PdT7TEEbtwaEz",
    propertyTitle: "Eko Atlantic Penthouse",
    lastMessage: "Can we schedule a viewing this weekend?",
    time: "5h ago",
    unread: 0,
    messages: [
      { id: "m1", from: "buyer", text: "Hi, I saw your listing for the Eko Atlantic Penthouse.", time: "8:00 AM" },
      { id: "m2", from: "buyer", text: "Can we schedule a viewing this weekend?", time: "8:02 AM" },
    ],
  },
];

/**
 * Renders inside AgentDashboardLayout's <Outlet>.
 * Same two-pane conversation pattern as the buyer MessagesPage — kept
 * as a separate component since the agent is always the responder
 * (not the initiator), and the data shape reflects inquiry-driven
 * conversations rather than free-form buyer messaging.
 */
export default function AgentMessagesPage() {
  const [activeId, setActiveId] = useState("c1");
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState(DEMO_CONVERSATIONS);

  const active = conversations.find((c) => c.id === activeId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [...c.messages, { id: `m${Date.now()}`, from: "agent", text: input.trim(), time: "Just now" }],
              lastMessage: input.trim(),
              unread: 0,
            }
          : c
      )
    );
    setInput("");
    // TODO: POST to /api/messages once backend exists
  };

  return (
    <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
      <header className="h-20 bg-surface border-b border-outline-variant/30 shadow-sm flex items-center px-8 sticky top-0 z-40">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Messages</h2>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 bg-surface border-r border-outline-variant/30 flex flex-col overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`flex items-start gap-3 p-4 text-left border-b border-outline-variant/20 transition-colors ${
                activeId === c.id ? "bg-surface-container-low" : "hover:bg-surface-container"
              }`}
            >
              <img src={c.buyerAvatar} alt={c.buyerName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-label-md text-label-md font-bold text-on-surface truncate">{c.buyerName}</p>
                  <span className="text-xs text-on-surface-variant">{c.time}</span>
                </div>
                <p className="text-xs text-on-surface-variant truncate">{c.propertyTitle}</p>
                <p className="text-xs text-on-surface-variant truncate mt-0.5">{c.lastMessage}</p>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </aside>

        <section className="flex-1 flex flex-col">
          {active ? (
            <>
              <div className="p-4 border-b border-outline-variant/30 bg-surface">
                <p className="font-label-md font-bold text-on-surface">{active.buyerName}</p>
                <p className="text-xs text-on-surface-variant">{active.propertyTitle}</p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {active.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === "agent" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs px-4 py-3 rounded-2xl font-body-md text-body-md ${
                      msg.from === "agent"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-surface-container text-on-surface rounded-bl-none"
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.from === "agent" ? "text-white/70" : "text-on-surface-variant"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-outline-variant/30 bg-surface flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 px-4 py-3 border border-outline-variant rounded-full font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-40"
                >
                  <Icon name="send" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-on-surface-variant">
              <Icon name="chat" className="text-[48px] opacity-20" />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
