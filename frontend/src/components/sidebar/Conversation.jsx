import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { FaLock } from "react-icons/fa";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = conversation._id === selectedConversation?._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers?.includes(conversation._id);
  
  return (
    <div
      className={`flex gap-3 items-center p-2 mx-2 mb-1 rounded-[4px] cursor-pointer transition-none ${
        isSelected 
          ? "bg-[#3F4147] text-white" 
          : "text-[#949BA4] hover:bg-[#35373C] hover:text-gray-200"
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className={`avatar ${isOnline ? "online" : "offline"} relative`}>
        <div className="w-8 h-8 rounded-full">
          <img
            src={conversation.avatar}
            alt={conversation.username}
            className="object-cover"
          />
        </div>
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a559] rounded-full border-2 border-[#2B2D31]"></div>
        )}
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="font-medium truncate text-sm">
            {conversation.fullName}
          </p>
          {isSelected && (
            <div className="flex items-center text-gray-400">
              <FaLock className="text-[10px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
