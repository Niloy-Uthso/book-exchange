import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";

const ChatBox = ({ conversation, currentUser }) => {
  const [messages, setMessages] = useState([]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!conversation?._id) return;
    fetch(`http://localhost:5000/messages/${conversation._id}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
  }, [conversation]);

  // Send message
  const handleSendMessage = async (text) => {
    const newMessage = {
      conversationId: conversation._id,
      sender: currentUser,
      text,
    };

    const res = await fetch("http://localhost:5000/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, data]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b bg-white shadow-sm">
        <h2 className="text-gray-800 font-semibold">
          {conversation.members.find((m) => m !== currentUser)}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`my-2 flex ${
              msg.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
                msg.sender === currentUser
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t bg-white">
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatBox;
