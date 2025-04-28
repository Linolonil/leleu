import { motion } from "framer-motion";
import Image from "next/image";

interface FriendMessage {
  name: string;
  message: string;
  image?: string;
}

interface FriendMessagesProps {
  messages: FriendMessage[];
}

export function FriendMessages({ messages }: FriendMessagesProps) {

  return (
    <motion.div
      className="container mx-auto py-16"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
    >
      <div className="bg-[url('/placeholder.svg?height=300&width=800')] bg-cover bg-center py-16 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Mensagens dos Amigos Ninjas</h2>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className="bg-white/10 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
                  {message.image && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400 flex-shrink-0">
                      <Image
                        src={message.image}
                        alt={message.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="italic text-white/90 mb-2">{message.message}</p>
                    <p className="text-orange-300 font-medium">{message.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

       
        </div>
      </div>
    </motion.div>
  );
} 