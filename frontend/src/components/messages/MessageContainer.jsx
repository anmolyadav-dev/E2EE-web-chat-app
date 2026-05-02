import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { FaLock } from "react-icons/fa";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  
  // Make sure to clean up on unmount
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  
  return (
    <div className={`
      flex-1 flex flex-col bg-[#313338] w-full h-full
      ${!selectedConversation ? "hidden md:flex" : "flex"}
    `}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-[#313338] px-4 py-3 border-b border-[#1E1F22] flex items-center shadow-sm z-10 min-h-[48px]">
            {/* Back button for mobile */}
            <button 
              className="md:hidden mr-3 text-gray-400 hover:text-white"
              onClick={() => setSelectedConversation(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="text-gray-400 text-xl mr-2 font-bold">@</span>
              <span className="text-white font-semibold text-md">
                {selectedConversation.fullName}
              </span>
            </div>
            <div className="ml-auto flex items-center text-green-400 text-xs px-2 py-1 bg-[#232428] rounded-full">
              <FaLock className="mr-1 text-[10px]" />
              <span className="hidden sm:inline">E2E Encrypted</span>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#313338]">
      <div className="text-center px-6 flex flex-col items-center">
        <div className="w-24 h-24 bg-[#2B2D31] rounded-full flex items-center justify-center mb-6 shadow-lg">
          <TiMessages className="text-5xl text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Welcome, {authUser?.fullName}
        </h3>
        <p className="text-gray-400 mb-6">
          Select a conversation from the sidebar or start a new one.
        </p>
        <div className="flex items-center justify-center text-[#23a559] text-sm bg-[#23a559]/10 px-4 py-2 rounded-full">
          <FaLock className="mr-2" />
          <span>Messages are end-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
};
