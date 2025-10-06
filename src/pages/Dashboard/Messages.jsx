import { useEffect, useState } from "react";
// import { useAuth } from "../../hooks/useAuth"; // your existing custom hook
import ChatList from "../../components/ChatList";
import ChatBox from "../../components/ChatBox";
import useAuth from "../../hooks/useAuth";

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // Fetch all conversations for logged-in user
  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/conversations/${user.email}`)
      .then((res) => res.json())
      .then((data) => setConversations(data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="flex h-[calc(100vh-120px)] bg-gray-50 rounded-lg shadow-md overflow-hidden">
      {/* Left Side - Chat List */}
      <div className="w-1/3 border-r bg-white">
        <ChatList
          conversations={conversations}
          currentUser={user?.email}
          onSelect={setSelectedChat}
        />
      </div>

      {/* Right Side - Chat Box */}
      <div className="flex-1">
        {selectedChat ? (
          <ChatBox conversation={selectedChat} currentUser={user?.email} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start chatting 💬
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
