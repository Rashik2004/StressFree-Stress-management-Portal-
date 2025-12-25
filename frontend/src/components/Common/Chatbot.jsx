
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Smile, Loader } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import aiService from "../../features/aiService";
import { Link } from "react-router-dom";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! I'm your mindful companion. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const { user } = useContext(AuthContext);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const token = user ? user.token : null;

      if (!token) {
        throw new Error("User not authenticated");
      }

      const data = await aiService.chatWithAI(userMessage.text, token);

      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.response,
          suggestion: data.suggestion
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 600); // 600ms artificial delay for "thinking" feel

    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    }
  };



  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[9999] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="bg-primary/10 dark:bg-primary/20 p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Smile className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">Mindful Bot</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Always here to listen</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.suggestion && (
                       <div className="mt-3 p-2 bg-primary/5 rounded-lg border border-primary/10">
                         <p className="text-xs font-semibold text-gray-500 mb-1">Recommended for you:</p>
                         <Link
                           to={msg.suggestion.link}
                           className="flex items-center text-primary font-medium hover:underline text-xs"
                           onClick={() => setIsOpen(false)} // Close on navigate
                         >
                           {msg.suggestion.title}
                         </Link>
                       </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex space-x-1.5">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type how you feel..."
                className="flex-1 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-gray-200 dark:border-gray-700 placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <Send className="w-5 h-5 pl-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
            onClick={toggleChat}
            className="fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] z-[9999] group overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Chatbot"
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <X className="w-6 h-6 relative z-10" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="open"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <MessageCircle className="w-6 h-6 relative z-10" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    </>
  );
};

export default Chatbot;
