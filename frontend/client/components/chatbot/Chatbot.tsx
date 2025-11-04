import React, { useState } from "react";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me about any Indian government scheme." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    try {
      const res = await fetch(`/api/search_schemes?q=${encodeURIComponent(input)}`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setMessages((msgs) => [
          ...msgs,
          { sender: "bot", text: `Here are the best matching schemes:` },
          ...data.results.slice(0, 5).map((s: any) => ({
            sender: "bot",
            text: `${s.title}${s.link ? `: ${s.link}` : ""}`,
          })),
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          { sender: "bot", text: "Sorry, I couldn't find any matching schemes." },
        ]);
      }
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "There was an error searching schemes." },
      ]);
    }
    setInput("");
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow p-6 rounded mt-8">
      <div className="h-64 overflow-y-auto border-b mb-4 pb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 text-left ${msg.sender === "bot" ? "text-blue-700" : "text-gray-900"}`}>
            <span className="font-semibold">{msg.sender === "bot" ? "Bot" : "You"}:</span> {msg.text}
          </div>
        ))}
        {loading && <div className="text-blue-500">Bot is typing...</div>}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2 mt-2">
        <input
          className="flex-1 border rounded px-3 py-2 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a scheme..."
          disabled={loading}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
