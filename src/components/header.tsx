import { motion } from "framer-motion";
import Image from "next/image";
import { Cake, Heart, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onShowSpecialMessage: () => void;
}

export function Header({ onShowSpecialMessage }: HeaderProps) {
  return (
    <motion.div
      className="container mx-auto pt-20 pb-10 text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="inline-block"
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      >
        <Image src="/logo.png" alt="Naruto Logo" width={400} height={500} className="object-contain" />
      </motion.div>

      <motion.div
        className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4 flex items-center justify-center gap-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Cake className="h-12 w-12" />
        <span>ANIVERSÁRIO NINJA</span>
        <Cake className="h-12 w-12" />
      </motion.div>

      <motion.p
        className="text-xl text-white/90 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Comemore o aniversário do ninja mais incrível da Vila da Folha!
      </motion.p>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
      

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          onClick={onShowSpecialMessage}
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-full">
            <Heart className="mr-2 h-5 w-5" />
            Mensagem Especial
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            const timelineSection = document.getElementById("timeline-section");
            if (timelineSection) {
              timelineSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full">
            <Scroll className="mr-2 h-5 w-5" />
            Jornada Ninja
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
} 