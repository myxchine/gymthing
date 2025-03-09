import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MarqueePrompts({
  prompts,
  speed,
  direction = "left",
}: {
  prompts: string[];
  speed: number;
  direction?: "left" | "right";
}) {
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  useEffect(() => {
    const calculateWidth = () => {
      const totalWidth = prompts.reduce(
        (acc, prompt) => acc + prompt.length * 10,
        0
      );
      setMarqueeWidth(totalWidth);
    };
    calculateWidth();
  }, [prompts]);

  return (
    <div className="overflow-hidden whitespace-nowrap max-w-xl mx-auto">
      <motion.div
        className="flex gap-3"
        animate={{
          x: direction === "left" ? [0, -marqueeWidth] : [-marqueeWidth, 0],
        }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        style={{ minWidth: marqueeWidth * 2 }}
      >
        {[...prompts, ...prompts].map((prompt, index) => (
          <p key={index} className="text-sm px-3 py-2 rounded bg-black/5">
            {prompt}
          </p>
        ))}
      </motion.div>
    </div>
  );
}
