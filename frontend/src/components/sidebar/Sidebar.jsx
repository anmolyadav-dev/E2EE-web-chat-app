import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton.jsx";
import SearchInput from "./SearchInput";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  
  return (
    <div className={`
      w-full md:w-80 bg-[#2B2D31] border-none flex flex-col h-full
      ${selectedConversation ? "hidden md:flex" : "flex"}
    `}>
      <div className="p-4 shadow-sm z-10 bg-[#2B2D31]">
        <SearchInput />
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 custom-scrollbar">
        <Conversations />
      </div>
      <div className="p-3 bg-[#232428] mt-auto flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative">
            <img 
              src={authUser?.avatar || "https://ui-avatars.com/api/?name=User&background=313338&color=fff"} 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover bg-[#313338]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://ui-avatars.com/api/?name=User&background=313338&color=fff";
              }}
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a559] rounded-full border-2 border-[#232428]"></div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white text-sm font-semibold truncate">
              {authUser?.fullName}
            </span>
            <span className="text-gray-400 text-xs truncate">
              @{authUser?.username}
            </span>
          </div>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};
export default Sidebar;
