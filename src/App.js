import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io();

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
    setMessages([{ body: message, from: "me" }, ...messages]);
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages((messages) => [message, ...messages]);
      console.log(message);
    };

    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  return (
    <div className="App container mx-auto shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <div class="py-5">
          <input
            class="w-full bg-gray-300 py-5 px-3 rounded-xl"
            value={message}
            type="text"
            placeholder="type your message here..."
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button className="hidden">Send</button>
      </form>

      {messages.map((message, index) =>
        message.from === "me" ? (
          <div class="flex flex-col mt-5" key={index}>
            <div class="flex justify-end mb-4">
              <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                {message.body}
              </div>
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                class="object-cover h-8 w-8 rounded-full"
                alt=""
              />
            </div>
          </div>
        ) : (
          <div class="flex justify-start mb-4" key={index}>
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
              {message.body}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
