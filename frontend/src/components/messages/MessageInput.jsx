import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";
import { FaLock } from "react-icons/fa";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }
    await sendMessage(message);
    setMessage("");
  };
  
  return (
    <form className="px-4 py-4 bg-[#313338]" onSubmit={handleSubmit}>
      <div className="relative">
        <div className="flex items-center bg-[#383A40] rounded-[8px] px-4 py-2 w-full">
          <div className="text-gray-400 mr-2 flex items-center justify-center">
            <FaLock className="text-xs" title="End-to-end encrypted" />
          </div>
          <input
            type="text"
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
          <div className="flex items-center ml-2">
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="text-gray-400 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <BsSend className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
