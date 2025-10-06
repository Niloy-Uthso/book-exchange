import { useState } from "react";
import { Send } from "lucide-react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-3 gap-2 bg-white"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default MessageInput;
