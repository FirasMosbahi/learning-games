"use client";

import Image from "next/image";
import Fog from "@learning-game/components/music-box/Fog";
import OptionsSelect from "@learning-game/components/music-box/OptionsSelect";
import { FIRST_YEAR_GAME_DATA } from "@learning-game/data/first-year-game-data";
import { useEffect, useState, use, useMemo } from "react";
import FailPopup from "@learning-game/components/music-box/FailPopup";
import LevelsIndicator from "@learning-game/components/general/LevelsIndicator";
import { PageProps } from "@learning-game/types/page-props";
import { sleep } from "@learning-game/utils/sleep";
import SuccessPopup from "@learning-game/components/general/SuccessPopup";

export default function Page(props: PageProps) {
  useEffect(() => {
    setPuzzles(Array.from({ length: initialPuzzlePieces }, (_, i) => i));
  }, [props.searchParams]);
  const data = useMemo(
    () =>
      FIRST_YEAR_GAME_DATA.find(
        (m) =>
          m.level ===
          Number.parseInt((props.searchParams?.level ?? "0") as string),
      ),
    [props.searchParams],
  );
  const [success, setSuccess] = useState<boolean>(false);
  const initialPuzzlePieces = data.data.length;
  const [puzzles, setPuzzles] = useState<number[]>(
    Array.from({ length: initialPuzzlePieces }, (_, i) => i),
  );
  const [showFail, setShowFail] = useState<boolean>(false);
  async function onSelect(option: string) {
    if (data.data[initialPuzzlePieces - puzzles.length].missing === option) {
      setPuzzles((actualPuzzle) => {
        const randomIndex = Math.floor(Math.random() * actualPuzzle.length);
        return actualPuzzle.filter((_, index) => index !== randomIndex);
      });
      if (puzzles.length === 1) {
        await sleep(2000);
        setSuccess(true);
      }
    } else {
      setShowFail(true);
    }
  }
  return (
    <div
      className={`flex flex-col pt-8 items-center justify-center h-screen relative w-screen bg-white ${showFail ? "opacity-80" : ""}`}
    >
      {success && <SuccessPopup level={data.level} />}
      {showFail && (
        <FailPopup
          onReset={() =>
            setPuzzles(Array.from({ length: initialPuzzlePieces }, (_, i) => i))
          }
          show={showFail}
          onClose={() => setShowFail(false)}
        />
      )}
      <div className="w-full px-8 flex flex-row justify-between">
        <div>
          <LevelsIndicator levels={FIRST_YEAR_GAME_DATA.map((g) => g.title)} />
        </div>
        <div className="flex w-[80%] flex-col gap-6 items-center justify-start">
          <div className="relative max-w-[1000px] h-[450px]">
            <div className="absolute grid grid-cols-3 z-10">
              {Array.from({ length: initialPuzzlePieces }, (_, i) => i).map(
                (index) => (
                  <Fog key={index} index={index} puzzle={puzzles} />
                ),
              )}
            </div>
            <Image
              width={400}
              height={400}
              src={data.image}
              alt="music instrument"
              className="z-0 h-[450px] w-[450px]"
            />
          </div>
          {puzzles.length > 0 && (
            <OptionsSelect
              onSelect={onSelect}
              options={data.data[initialPuzzlePieces - puzzles.length]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
