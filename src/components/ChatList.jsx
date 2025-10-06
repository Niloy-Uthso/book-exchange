import { useEffect, useState } from "react";

const ChatList = ({ conversations, currentUser, onSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (conversations.length > 0) {
      const others = conversations.map((conv) =>
        conv.members.find((m) => m !== currentUser)
      );
      setUsers(others);
    }
  }, [conversations, currentUser]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold p-4 border-b bg-gray-100">
        Your Conversations
      </h2>
      <ul className="flex-1 overflow-y-auto">
        {conversations.map((conv, i) => (
          <li
            key={conv._id}
            onClick={() => onSelect(conv)}
            className="p-4 border-b cursor-pointer hover:bg-blue-50 transition"
          >
            <p className="font-medium text-gray-700">
              {users[i] || "Unknown user"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
