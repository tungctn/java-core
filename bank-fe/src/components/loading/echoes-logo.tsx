// components/Logo.tsx
import { motion } from "framer-motion";
import Image from "next/image";

const EchoesLogo = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Main Logo Animation Container */}
      <div className="relative w-52 h-52 flex items-center justify-center">
        {/* Central Logo */}
        <div className="w-28 h-28 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Echoes Logo"
              width={112} // w-28 = 7rem = 112px
              height={112}
              className="w-full h-full"
            />
          </motion.div>
        </div>

        {/* Animated Rings */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              border: `2px solid ${
                index === 0 ? "#b091ff" : index === 1 ? "#5a88e0" : "#3e4de0"
              }`,
              borderRadius: "50%",
              opacity: 0.6,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1 - index * 0.1, 1 + index * 0.1],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: index % 2 === 0 ? "#b091ff" : "#5a88e0",
            }}
            animate={{
              x: [0, Math.cos((index * 60 * Math.PI) / 180) * 80],
              y: [0, Math.sin((index * 60 * Math.PI) / 180) * 80],
              opacity: [0.8, 0.3, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2,
            }}
          />
        ))}
      </div>

      {/* "ECHOES" Text Animation */}
      {/* <div className="flex gap-0.5">
        {"ECHOES".split("").map((letter, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            style={{
              color: "#3e4de0",
              fontSize: "24px",
              fontWeight: "bold",
              fontFamily: "Trebuchet MS, Arial",
            }}
          >
            {letter}
          </motion.div>
        ))}
      </div> */}
    </div>
  );
};

export default EchoesLogo;
