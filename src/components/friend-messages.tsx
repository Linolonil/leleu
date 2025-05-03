import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FriendMessage {
  name: string;
  message: string;
}

interface FriendMessagesProps {
  messages: FriendMessage[];
}

export function FriendMessages({ messages }: FriendMessagesProps) {
  const [revealedMessages, setRevealedMessages] = useState<number[]>([]);

  const revealMessage = (index: number) => {
    if (!revealedMessages.includes(index)) {
      setRevealedMessages([...revealedMessages, index]);
    }
  };

  return (
    <motion.div
      className="container mx-auto py-16"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
    >
      <div className="bg-[url('/cheers.gif')] bg-cover bg-center py-16 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Mensagens dos Amigos
          </h2>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className="bg-black rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                onClick={() => revealMessage(index)}
              >
                {revealedMessages.includes(index) ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
                    <div className="flex-1">
                      <p className="italic text-white mb-2">{message.message}</p>
                      <p className="text-orange-300 font-medium">{message.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-white/70 font-medium">Clique para revelar a mensagem {index + 1}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}