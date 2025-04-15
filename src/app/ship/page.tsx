"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { sleep } from "@learning-game/utils/sleep";
import { useAnimation, motion } from "framer-motion";
import Level from "@learning-game/components/ship/Level";
import { PageProps } from "@learning-game/types/page-props";
import { FIRST_YEAR_GAME_DATA } from "@learning-game/data/first-year-game-data";

const islandsPositions = [
  {
    top: "360px",
    left: "20px",
  },
  {
    top: "180px",
    left: "240px",
  },
  {
    top: "420px",
    left: "540px",
  },
  {
    top: "120px",
    left: "820px",
  },
  {
    top: "360px",
    left: "1060px",
  },
];

const islands = [
  {
    alt: "Island 1",
    position: "absolute left-[20px] top-[360px]",
  },
  {
    alt: "Island 2",
    position: "absolute left-[280px] top-[120px]",
  },
  {
    alt: "Island 3",
    position: "absolute left-[620px] top-[360px]",
  },
  {
    alt: "Island 4",
    position: "absolute left-[900px] top-[40px]",
  },
  {
    alt: "Island 5",
    position: "absolute left-[1100px] top-[280px]",
  },
];

export default function Page(props: PageProps) {
  const level = Number.parseInt((props.searchParams["level"] ?? "0") as string);
  console.log(level);
  const gameData = FIRST_YEAR_GAME_DATA.find((g) => g.level === level);
  const [stage, setStage] = useState<number>(0);
  const [showLevels, setShowLevels] = useState<boolean>(false);
  const shipAnimate = useAnimation();
  async function initialize() {
    await sleep(3000);
    setShowLevels(true);
  }
  useEffect(() => {
    initialize();
  }, []);
  async function onLevelSuccess() {
    if (stage === 3) {
      setShowLevels(false);
    }
    setShowLevels(false);
    setStage((l) => l + 1);
    await sleep(1000);
    await shipAnimate.start(
      {
        top: islandsPositions[stage + 1].top,
        left: islandsPositions[stage + 1].left,
      },
      { duration: 3 },
    );
    await sleep(2000);
    setShowLevels(true);
  }
  return (
    <div
      className="relative w-screen h-screen bg-white"
      style={{
        backgroundImage: `url('/ship/sea.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {showLevels && (
        <Level
          onSuccess={onLevelSuccess}
          option={gameData.data[stage]}
          level={gameData.level.toString()}
        />
      )}
      {islands.map((p, i) => (
        <Image
          src="/ship/island.png"
          alt={p.alt}
          className={`${p.position} size-[280px] cursor-pointer`}
          key={i}
          height={225}
          width={225}
        />
      ))}
      <motion.div
        animate={shipAnimate}
        className="absolute left-[0px] top-[480px] z-10"
      >
        <Image
          src="/ship/ship.png"
          alt="ship"
          className="size-[180px]"
          width={225}
          height={225}
        />
      </motion.div>
    </div>
  );
}
