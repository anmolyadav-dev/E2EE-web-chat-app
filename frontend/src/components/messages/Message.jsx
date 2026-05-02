import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  
  // Defensive checks
  if (!message) {
    console.warn("Message component received null/undefined message");
    return null;
  }
  
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe ? authUser.avatar : selectedConversation?.avatar;
  const shakeClass = message.shouldShake ? "shake" : "";
  
  return (
    <div className={`flex w-full px-4 py-2 mt-1 ${fromMe ? 'justify-end' : 'justify-start'} ${shakeClass}`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] ${fromMe ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        
        {/* Avatar with placeholder */}
        <div className="flex-shrink-0 pt-1 relative w-10 h-10">
          {!avatarLoaded && (
            <div className="absolute inset-0 rounded-full bg-[#383A40] animate-pulse"></div>
          )}
          <img 
            src={profilePic || "https://ui-avatars.com/api/?name=User&background=313338&color=fff"} 
            alt="Avatar" 
            className={`w-10 h-10 rounded-full object-cover transition-opacity duration-300 ${avatarLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setAvatarLoaded(true)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://ui-avatars.com/api/?name=User&background=313338&color=fff";
              setAvatarLoaded(true);
            }}
          />
        </div>

        {/* Message Content */}
        <div className={`flex flex-col min-w-0 ${fromMe ? 'items-end' : 'items-start'}`}>
          <div className={`flex items-baseline gap-2 mb-1 ${fromMe ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="font-medium text-gray-200 text-sm">
              {fromMe ? authUser.fullName : selectedConversation?.fullName}
            </span>
            <span className="text-xs text-gray-500">
              {formattedTime}
            </span>
            {message.isEncrypted && (
              <span className="text-[#23a559] text-[10px]" title="Encrypted message">
                🔒
              </span>
            )}
          </div>
          
          <div className={`px-4 py-2 rounded-2xl break-words leading-relaxed text-sm md:text-base text-gray-200
            ${fromMe 
              ? 'bg-[#5865F2] rounded-tr-sm' 
              : 'bg-[#383A40] rounded-tl-sm'
            }`}
          >
            {message.message || <span className="text-gray-400 italic">Empty message</span>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Message;
