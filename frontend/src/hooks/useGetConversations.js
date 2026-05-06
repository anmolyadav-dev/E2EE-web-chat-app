import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      const handleNewUser = (newUser) => {
        setConversations((prev) => {
          // Prevent adding duplicate user if they're already in the list
          if (prev.some(user => user._id === newUser._id)) return prev;
          return [...prev, newUser];
        });
      };
      
      socket.on("newUser", handleNewUser);
      
      return () => {
        socket.off("newUser", handleNewUser);
      };
    }
  }, [socket]);

  return { loading, conversations };
};

export default useGetConversations;
