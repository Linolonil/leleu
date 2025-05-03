import { motion } from "framer-motion";
import Image from "next/image";

export function BirthdayHero() {
  return (
    <div className="container mx-auto py-10">
      <motion.div
        className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-orange-400/30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="flex justify-center items-center">
            <motion.div
              className="relative h-[300px] w-[300px] rounded-full overflow-hidden border-4 border-orange-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, borderColor: "#FFD700" }}
            >
              <Image
                src="/lele2.jpg"
                alt="Leandro Negreiros"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="flex flex-col justify-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-orange-300 mb-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              Leandro Negreiros
            </motion.h2>

            <motion.div
              className="text-white/90 space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <p className="text-xl">
                <span className="font-bold">Idade:</span> 29 anos
              </p>
              <p className="text-xl">
                <span className="font-bold">Rank Ninja:</span> Hokage da Programação
              </p>
              <p className="text-xl">
                <span className="font-bold">Jutsus Especiais:</span> Código no Jutsu, Bug Resolver Technique, Vue no Jutsu, Edo TypeScript
              </p>
              <p className="text-xl">
                <span className="font-bold">Missões Completadas:</span> Desenvolvimento de Bugs, Criação de Saas saasTemas 
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 