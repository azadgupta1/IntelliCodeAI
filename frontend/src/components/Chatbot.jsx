// // src/components/ChatBot.js
// import React, { useState } from "react";
// import { FaCommentDots } from "react-icons/fa";

// const ChatBot = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   return (
//     <>
//       {/* 🟡 Floating Chatbot Icon */}
//       <button
//         onClick={() => setIsChatOpen((prev) => !prev)}
//         className="fixed bottom-6 right-6 dark:bg-gray-900 text-white p-4 rounded-full shadow-lg hover:dark:bg-gray-900 transition-all z-50"
//       >
//         <FaCommentDots size={24} />
//       </button>

//       {/* 🟢 Chatbox UI */}
//       {isChatOpen && (
//         <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 rounded-xl shadow-lg z-50">
//           <div className="p-4 border-b font-semibold dark:bg-gray-900 text-white rounded-t-xl">
//             AI Chat Assistant
//           </div>
//           <div className="p-4 h-64 overflow-y-auto">
//             <p className="text-sm text-gray-600">Hi there! How can I help you today?</p>
//             {/* Later: Append messages and add Gemini API response here */}
//           </div>
//           <div className="p-2 border-t">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatBot;




// src/components/ChatBot.js
import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = {
        text: data.reply || "Sorry, I didn't get that.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong. Please try again.", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsChatOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-gray-900 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaCommentDots size={24} />
      </button>

      {/* Chatbox UI */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white border border-gray-300 rounded-xl shadow-lg z-50 flex flex-col">
          <div className="p-4 border-b bg-gray-900 text-white font-semibold rounded-t-xl">
            IntellicodeAI Assistant
          </div>

          {/* Messages */}
          <div className="p-4 flex-1 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end text-right"
                    : "bg-gray-100 self-start text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="self-start">
                <TypingDots />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Typing dots animation like WhatsApp
const TypingDots = () => (
  <div className="flex space-x-1 px-2 py-1">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
  </div>
);

export default ChatBot;
