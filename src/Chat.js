import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./components/navbar";
import { getConversation, sendMessage } from "./api";

function Chat() {
  const { username } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  const token = localStorage.getItem("token");
  const myUsername = localStorage.getItem("username");

  const loadMessages = async () => {
    try {
      const res = await getConversation(token, username);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadMessages();

    const interval = setInterval(loadMessages, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      await sendMessage(token, username, text);

      setText("");

      loadMessages();

    } catch (err) {
      console.log(err);
      alert("Message not sent");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">

        <div className="max-w-4xl mx-auto">

          <div className="bg-purple-600 text-white text-2xl font-bold p-5 rounded-b-xl shadow">
            Chat with {username}
          </div>

          <div className="bg-white h-[70vh] overflow-y-auto p-6">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`mb-4 flex ${
                  msg.sender.username === myUsername
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-xs px-4 py-3 rounded-xl shadow ${
                    msg.sender.username === myUsername
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >

                  <p>{msg.content}</p>

                  <small className="block mt-2 opacity-70">
                    {msg.sender.username}
                  </small>

                </div>

              </div>

            ))}

            <div ref={bottomRef}></div>

          </div>

          <div className="bg-white p-5 flex gap-4">

            <input
              className="flex-1 border rounded-lg px-4"
              placeholder="Type message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={handleSend}
              className="bg-purple-600 text-white px-6 rounded-lg hover:bg-purple-700"
            >
              Send
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Chat;