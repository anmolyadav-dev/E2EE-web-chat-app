import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  
  // Defensive checks
  if (!message) {
    console.warn("Message component received null/undefined message");
    return null;
  }
  
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.avatar : selectedConversation?.avatar;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-700";
  const shakeClass = message.shouldShake ? "shake" : "";
  
  // Debug logging
  useEffect(() => {
    console.log("Message component rendering:", {
      messageId: message._id,
      fromMe,
      messageText: message.message?.substring(0, 50) + "...",
      isEncrypted: message.isEncrypted
    });
  }, [message]);
  
  return (
    <div className={`flex gap-4 px-4 py-1 hover:bg-[#2E3035] mt-1 ${shakeClass}`}>
      <div className="flex-shrink-0 pt-1">
        <img 
          src={profilePic || "https://ui-avatars.com/api/?name=User&background=313338&color=fff"} 
          alt="Avatar" 
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://ui-avatars.com/api/?name=User&background=313338&color=fff";
          }}
        />
      </div>

      <div className="flex flex-col min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-gray-100 text-sm md:text-base">
            {fromMe ? authUser.fullName : selectedConversation?.fullName}
          </span>
          <span className="text-xs text-gray-400">
            {formattedTime}
          </span>
          {message.isEncrypted && (
            <span className="text-[#23a559] text-[10px]" title="Encrypted message">
              🔒
            </span>
          )}
        </div>
        
        <div className="text-gray-300 text-sm md:text-base break-words leading-relaxed">
          {message.message || <span className="text-gray-500 italic">Empty message</span>}
        </div>
      </div>
    </div>
  );
};

export default Message;
