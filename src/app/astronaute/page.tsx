"use client";

import Image from "next/image";
import LevelPopup from "@learning-game/components/astronaute/level-popup";
import { useEffect, useState } from "react";
import { sleep } from "@learning-game/utils/sleep";
import { useAnimation, motion } from "framer-motion";
import LevelsIndicator from "@learning-game/components/general/LevelsIndicator";
import { SECOND_YEAR_GAME_DATA } from "@learning-game/data/second-year-game-data";
import { PageProps } from "@learning-game/types/page-props";

const planetsPositions = [
  {
    top: "120px",
    left: "240px",
  },
  // {
  //   top: "360px",
  //   left: "280px",
  // },
  {
    top: "340px",
    left: "620px",
  },
  // {
  //   top: "360px",
  //   left: "900px",
  // },
  {
    top: "100px",
    left: "1100px",
  },
];

const planets = [
  {
    image: "/astronaute/planet1.png",
    alt: "Astronaute planet1",
    position: "absolute left-[240px] top-[120px]",
  },
  // {
  //   image: "/astronaute/planet2.png",
  //   alt: "Astronaute planet2",
  //   position: "absolute left-[280px] top-[360px]",
  // },
  {
    image: "/astronaute/planet3.png",
    alt: "Astronaute planet3",
    position: "absolute left-[620px] top-[340px]",
  },
  // {
  //   image: "/astronaute/planet4.png",
  //   alt: "Astronaute planet4",
  //   position: "absolute left-[900px] top-[360px]",
  // },
  {
    image: "/astronaute/planet5.png",
    alt: "Astronaute planet5",
    position: "absolute left-[1100px] top-[100px]",
  },
];

export default function Page(props: PageProps) {
  const [level, setLevel] = useState<number>(0);
  const [showLevels, setShowLevels] = useState<boolean>(false);
  const shipAnimate = useAnimation();
  async function initialize() {
    setShowLevels(false);
    await sleep(3000);
    shipAnimate.set({
      top: planetsPositions[0].top,
      left: planetsPositions[0].left,
    });
    setLevel(0);
    setShowLevels(true);
  }
  useEffect(() => {
    initialize();
  }, [props.searchParams]);
  async function onLevelSuccess() {
    if (level === 1) {
      setShowLevels(false);
    }
    setShowLevels(false);
    setLevel((l) => l + 1);
    await sleep(1000);
    await shipAnimate.start(
      {
        top: planetsPositions[level + 1].top,
        left: planetsPositions[level + 1].left,
      },
      { duration: 3 },
    );
    await sleep(2000);
    setShowLevels(true);
  }
  return (
    <div
      className="relative w-screen h-screen"
      style={{
        backgroundImage: `url('/astronaute/background.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-row items-center px-4 justify-start h-screen">
        <LevelsIndicator
          className="w-40"
          levels={SECOND_YEAR_GAME_DATA.map((g) => g.title)}
          level={Number.parseInt((props.searchParams.level ?? "0") as string)}
        />
      </div>
      {showLevels && (
        <LevelPopup
          levelParam={Number.parseInt(
            (props.searchParams.level ?? "0") as string,
          )}
          onSuccess={onLevelSuccess}
          level={level}
        />
      )}
      {planets.map((p, i) => (
        <Image
          src={p.image}
          alt={p.alt}
          className={`${p.position} size-[280px] cursor-pointer`}
          key={i}
          height={225}
          width={225}
        />
      ))}
      <motion.div
        animate={shipAnimate}
        className="absolute left-[240px] top-[120px] z-10"
      >
        <Image
          src="/astronaute/space-ship.png"
          alt="space ship"
          className="size-[120px]"
          width={225}
          height={225}
        />
      </motion.div>
    </div>
  );
}
