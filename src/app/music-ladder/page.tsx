"use client";

import LevelsIndicator from "@learning-game/components/general/LevelsIndicator";
import Options from "@learning-game/components/music-ladder/Options";
import Image from "next/image";
import { SECOND_YEAR_GAME_DATA } from "@learning-game/data/second-year-game-data";
import { useEffect, useMemo, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { PageProps } from "@learning-game/types/page-props";

const levels = [
  "المستوى الأول",
  "المستوى الثاني",
  "المستوى الثالث",
  "المستوى الرابع",
];

export default function Page(props: PageProps) {
  const level = Number.parseInt((props.searchParams["level"] ?? "0") as string);
  const levelData = useMemo(
    () => SECOND_YEAR_GAME_DATA.find((m) => m.level === level),
    [props.searchParams],
  );
  const [progress, setProgress] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean>(false);
  useEffect(() => {
    animate.set({ top: "-240px" });
    setProgress(0);
    setIsWin(false);
  }, [props.searchParams]);
  const animate = useAnimation();
  const onSuccess = async () => {
    if (levelData.data.length > progress + 1) {
      setProgress((progress) => progress + 1);
      await animate.start(
        { top: `${-240 + 120 * (progress + 1)}px` },
        { duration: 1 },
      );
    } else {
      setIsWin(true);
      setProgress(0);
      await animate.start({ top: "480px" }, { duration: 1 });
    }
  };
  return (
    <div className="w-screen h-screen bg-white flex flex-row items-center px-16 justify-between">
      <LevelsIndicator
        levels={SECOND_YEAR_GAME_DATA.map((g) => g.title)}
        className="w-40"
      />
      <div className="relative w-[40%] h-[400px] overflow-y-hidden">
        <motion.div
          animate={animate}
          className="absolute right-0 bottom-0 flex flex-col gap-y-32 items-center justify-center"
        >
          <Image
            src={levelData.image}
            alt={levelData.image}
            width={400}
            height={400}
            className="size-[300px]"
          />
          <Image
            className="w-[300px] h-[500px]"
            src="/music-ladder/ladder.png"
            alt="music-ladder"
            width={800}
            height={400}
          />
        </motion.div>
      </div>
      <div className="w-[35%]">
        {isWin || (
          <Options onSuccess={onSuccess} options={levelData.data[progress]} />
        )}
      </div>
    </div>
  );
}
