"use client";

import Image from "next/image";
import Fog from "@learning-game/components/music-box/Fog";
import OptionsSelect from "@learning-game/components/music-box/OptionsSelect";
import { FIRST_YEAR_GAME_DATA } from "@learning-game/data/first-year-game-data";
import { useEffect, useState, useMemo } from "react";
import FailPopup from "@learning-game/components/general/FailPopup";
import { PageProps } from "@learning-game/types/page-props";
import { sleep } from "@learning-game/utils/sleep";
import MusicBoxPopup from "@learning-game/components/music-box/MusicBoxPopup";

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
      style={{
        backgroundImage: `url('/background/2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/*{success && <SuccessPopup level={data.level} />}*/}
      {showFail && (
        <FailPopup
          onReset={() =>
            setPuzzles(Array.from({ length: initialPuzzlePieces }, (_, i) => i))
          }
          show={showFail}
          onClose={() => setShowFail(false)}
        />
      )}
      <MusicBoxPopup
        musicSrc={data.sound}
        onClose={() => setSuccess(false)}
        show={success}
      />
      <div className="w-full px-8 flex flex-row justify-between">
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
