import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardTopbar from "../components/DashboardTopbar";
import ConversationListItem from "../components/ConversationListItem";
import ChatMessageBubble from "../components/ChatMessageBubble";
import Icon from "../components/Icon";
import { DASHBOARD_USER, SEED_CONVERSATIONS } from "../data/properties";

const FILTERS = ["All", "Unread", "Archived"];

/**
 * Renders inside DashboardLayout's <Outlet>. The Stitch export had one
 * hardcoded "active" conversation with static markup; here, clicking
 * any conversation in the left list actually swaps which thread shows
 * on the right — real component state, not a single fixed thread.
 *
 * Sending a message appends it to the active conversation's thread
 * client-side only; there's no backend yet to actually deliver it to
 * the other person, which the TODO below makes explicit.
 */
export default function MessagesPage() {
  const [conversations, setConversations] = useState(SEED_CONVERSATIONS);
  const [activeId, setActiveId] = useState(SEED_CONVERSATIONS[0]?.id);
  const [filter, setFilter] = useState("All");
  const [draft, setDraft] = useState("");
  const threadEndRef = useRef(null);

  const activeConversation = conversations.find((c) => c.id === activeId);

  const visibleConversations =
    filter === "Unread" ? conversations.filter((c) => c.unreadCount > 0) : conversations;
  // "Archived" has no demo data behind it yet — shows empty rather than
  // silently falling back to "All", which would be misleading.
  const filteredConversations = filter === "Archived" ? [] : visibleConversations;

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages.length, activeId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim() || !activeConversation) return;

    const newMessage = {
      id: `m-${Date.now()}`,
      sender: "me",
      text: draft.trim(),
      time: "Just now",
      read: false,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMessage], lastMessagePreview: newMessage.text, lastMessageTime: "Just now" }
          : c
      )
    );
    setDraft("");
    // TODO: POST to /api/conversations/:id/messages once a real
    // messaging backend exists — this only updates local state.
  };

  return (
    <div className="ml-64 min-h-screen">
      <DashboardTopbar searchPlaceholder="Search conversations..." user={DASHBOARD_USER} />

      <main className="pt-16 h-screen flex overflow-hidden">
        {/* Conversation list */}
        <section className="w-80 md:w-96 border-r border-outline-variant bg-surface-container-lowest flex flex-col">
          <div className="p-6 border-b border-outline-variant">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-headline-sm text-headline-sm">Messages</h2>
              <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors" aria-label="New message">
                <Icon name="edit_square" />
              </button>
            </div>
            <div className="flex gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    filter === f
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-high text-on-surface-variant font-medium"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => (
                <ConversationListItem
                  key={conv.id}
                  conversation={conv}
                  isActive={conv.id === activeId}
                  onClick={() => setActiveId(conv.id)}
                />
              ))
            ) : (
              <p className="p-6 text-center text-sm text-on-surface-variant">
                No {filter.toLowerCase()} conversations.
              </p>
            )}
          </div>
        </section>

        {/* Active thread */}
        <section className="flex-1 flex flex-col bg-surface-container-lowest">
          {activeConversation ? (
            <>
              <header className="h-16 px-6 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {activeConversation.contactAvatarUrl ? (
                      <img
                        src={activeConversation.contactAvatarUrl}
                        alt={activeConversation.contactName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-primary font-bold">
                        {activeConversation.contactInitials}
                      </div>
                    )}
                    {activeConversation.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-bold text-sm">{activeConversation.contactName}</h2>
                    {activeConversation.online && (
                      <p className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                        Online
                      </p>
                    )}
                  </div>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-primary">
                  more_vert
                </button>
              </header>

              {activeConversation.pinnedListing && (
                <div className="px-6 py-3 bg-surface-container-low border-b border-outline-variant">
                  <div className="bg-white rounded-xl shadow-sm border border-outline-variant p-2 flex items-center gap-4 max-w-2xl">
                    <img
                      src={activeConversation.pinnedListing.imageUrl}
                      alt={activeConversation.pinnedListing.title}
                      className="w-24 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                        Discussing Listing
                      </p>
                      <h4 className="font-bold text-sm truncate">
                        {activeConversation.pinnedListing.title}
                      </h4>
                      <p className="text-primary font-bold text-sm">
                        {activeConversation.pinnedListing.formattedPrice}
                      </p>
                    </div>
                    <Link
                      to="/listing/demo-1"
                      className="px-4 py-1.5 border-2 border-primary text-primary rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all whitespace-nowrap"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeConversation.messages.map((message) => (
                  <ChatMessageBubble
                    key={message.id}
                    message={message}
                    contactAvatarUrl={activeConversation.contactAvatarUrl}
                  />
                ))}
                <div ref={threadEndRef} />
              </div>

              <footer className="p-6 bg-surface-container-lowest border-t border-outline-variant">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" aria-label="Attach file">
                      <Icon name="attach_file" />
                    </button>
                    <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" aria-label="Emoji">
                      <Icon name="mood" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                  >
                    Send
                    <Icon name="send" className="text-sm" />
                  </button>
                </form>
                <p className="text-[10px] text-center text-on-surface-variant mt-3">
                  Messages are encrypted and secure. Response times may vary by agent.
                </p>
              </footer>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-on-surface-variant">
              Select a conversation to start chatting.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
