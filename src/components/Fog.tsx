"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function Fog({
  index,
  puzzle,
}: {
  index: number;
  puzzle: number[];
}) {
  const animate = useAnimation();
  const onShow = async () => {
    if (puzzle.includes(index)) return;
    console.log("Fog clicked");
    await animate.start({ opacity: 0 }, { duration: 1 });
  };
  useEffect(() => {
    onShow();
  }, [onShow, puzzle, animate]);
  return (
    <motion.div animate={animate}>
      <Image
        width={300}
        height={300}
        className="h-[150px] w-[150px]"
        src="/music-box/fog.png"
        alt="fog"
      />
    </motion.div>
  );
}
