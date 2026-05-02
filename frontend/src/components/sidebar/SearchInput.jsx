import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [search, setSearch] = useState();
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("search string should be atleast 3 characters long");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      return toast.error("no such user found");
    }
  };
  return (
    <form className="w-full relative" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Find or start a conversation"
        className="w-full bg-[#1E1F22] text-gray-200 text-sm placeholder-gray-400 rounded-[4px] px-2 py-1.5 focus:outline-none focus:ring-0 shadow-inner"
        value={search || ""}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="absolute right-2 top-1.5 text-gray-400 hover:text-gray-200">
        <IoSearchSharp className="w-4 h-4" />
      </button>
    </form>
  );
};
export default SearchInput;
