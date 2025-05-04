"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useAnimation, motion } from "framer-motion";
import { SECOND_YEAR_GAME_DATA } from "@learning-game/data/second-year-game-data";

const colorPalette = ["#B5B4D9", "#9CD3D9", "#F2D5CE", "#D0D991"];

export default function LevelPopup({
  level,
  onSuccess,
  onFailure,
  levelParam,
}: {
  level: number;
  onSuccess: () => void;
  onFailure: () => void;
  levelParam: number;
}) {
  const data = useMemo(
    () => SECOND_YEAR_GAME_DATA.find((g) => g.level === levelParam),
    [levelParam],
  );
  const [stage, setStage] = useState<number>(0);
  const cage1Animate = useAnimation();
  const cage2Animate = useAnimation();
  async function onClick(option: string) {
    if (option === data.data[level].options[stage].missing) {
      if (stage === 0) {
        await cage1Animate.start({ opacity: 0 }, { duration: 1 });
        setStage(1);
      } else {
        await cage2Animate.start({ opacity: 0 }, { duration: 1 });
        onSuccess();
      }
    } else {
      onFailure();
    }
  }
  return (
    <div className="z-30 opacity-100 absolute top-[10%] left-[10%] bg-white border border-solid border-black rounded-xl w-[80%] h-[80%]">
      <p className="w-full text-center text-xl text-black py-4">
        أكمل الأبيات الشعرية لتحرير رائد الفضاء المسجون
      </p>
      <div className="flex flex-row justify-between gap-[20%]">
        <div className="stage w-[50%] flex flex-col items-center justify-center gap-8 py-32">
          <div className="text-black text-3xl grid grid-cols-2 gap-y-4 gap-x-8">
            {data.data[level].text.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-12">
            {data.data[level].options[stage].options.map((option, i) => (
              <button
                className="text-3xl px-8 py-2 border border-solid border-transparent rounded-xl"
                style={{ backgroundColor: colorPalette[i] }}
                key={i}
                onClick={() => onClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="relative astronaute w-[30%]">
          <Image
            src="/astronaute/astronaute.png"
            alt="astronaute"
            height={400}
            width={325}
            className="absolute top-[80px] left-0 h-[320px] w-[180px]"
          />
          <motion.div
            className="absolute z-40 top-[40px] -left-[80px]"
            animate={cage1Animate}
          >
            <Image
              src="/astronaute/cage.png"
              alt="cage1"
              height={400}
              width={800}
              className="h-[420px] w-[480px]"
            />
          </motion.div>
          <motion.div
            className="absolute z-50 top-[40px] -left-[80px]"
            animate={cage2Animate}
          >
            <Image
              src="/astronaute/cage.png"
              alt="cage2"
              height={400}
              width={800}
              className="h-[440px] w-[480px] rotate-180"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
