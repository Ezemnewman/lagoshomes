import Icon from "./Icon";

/**
 * One row in the conversations list. Shows either a real avatar image
 * or initials in a circle (Femi Bankole's demo conversation has no
 * avatar, matching the Stitch export's "FB" initials fallback) —
 * same avatar-or-fallback pattern used by Navbar for the logged-in
 * user photo.
 */
export default function ConversationListItem({ conversation, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer transition-colors border-b border-outline-variant last:border-b-0 ${
        isActive ? "border-l-4 border-primary bg-primary/5" : "hover:bg-surface-container-low"
      }`}
    >
      <div className="flex gap-3">
        <div className="relative flex-shrink-0">
          {conversation.contactAvatarUrl ? (
            <img
              src={conversation.contactAvatarUrl}
              alt={conversation.contactName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-primary font-bold">
              {conversation.contactInitials}
            </div>
          )}
          {conversation.online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-0.5">
            <h3 className={`text-sm truncate ${isActive ? "font-bold" : "font-medium"}`}>
              {conversation.contactName}
            </h3>
            <span className="text-xs text-on-surface-variant whitespace-nowrap ml-2">
              {conversation.lastMessageTime}
            </span>
          </div>
          <p
            className={`text-sm truncate ${
              isActive ? "font-semibold text-primary" : "text-on-surface-variant"
            }`}
          >
            {conversation.lastMessagePreview}
          </p>
          {conversation.unreadCount > 0 && (
            <div className="flex justify-end mt-1">
              <span className="bg-primary px-1.5 py-0.5 rounded-full text-[10px] text-white font-bold">
                {conversation.unreadCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
