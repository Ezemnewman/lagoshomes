import Icon from "./Icon";

/**
 * One message bubble — left-aligned with avatar for messages from the
 * other person, right-aligned (no avatar, read receipt) for messages
 * "I" sent. `contactAvatarUrl` is passed in per-message rather than
 * looked up globally, since a real chat could eventually have multiple
 * participants (group inquiries with co-agents, etc.) even though
 * today's demo data is always one-on-one.
 */
export default function ChatMessageBubble({ message, contactAvatarUrl }) {
  const isMine = message.sender === "me";

  if (isMine) {
    return (
      <div className="flex flex-row-reverse items-start gap-3 max-w-[80%] ml-auto">
        <div className="flex flex-col items-end">
          <div className="bg-primary text-on-primary p-4 rounded-xl rounded-tr-none shadow-md text-sm leading-relaxed">
            {message.text}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[10px] text-on-surface-variant">{message.time}</span>
            {message.read && <Icon name="done_all" className="text-xs text-primary" filled />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 max-w-[80%]">
      <img
        src={contactAvatarUrl}
        alt="Contact"
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
      <div>
        <div className="bg-surface-container text-on-surface p-4 rounded-xl rounded-tl-none shadow-sm text-sm leading-relaxed">
          {message.text}
        </div>
        <span className="text-[10px] text-on-surface-variant mt-1 block">{message.time}</span>
      </div>
    </div>
  );
}
