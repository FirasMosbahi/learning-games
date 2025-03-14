"use client";

import Image from "next/image";
import Fog from "@learning-game/components/music-box/Fog";
import OptionsSelect from "@learning-game/components/music-box/OptionsSelect";
import { MUSIC_BOX_DATA } from "@learning-game/app/data/music-box-data";
import { useState } from "react";
import FailPopup from "@learning-game/components/music-box/FailPopup";

export default function Page() {
  const initialPuzzlePieces = 9;
  const [puzzles, setPuzzles] = useState<number[]>(
    Array.from({ length: initialPuzzlePieces }, (_, i) => i),
  );
  const [showFail, setShowFail] = useState<boolean>(false);
  async function onSelect(option: string) {
    if (
      MUSIC_BOX_DATA[initialPuzzlePieces - puzzles.length].missing === option
    ) {
      setPuzzles((actualPuzzle) => {
        const randomIndex = Math.floor(Math.random() * actualPuzzle.length);
        return actualPuzzle.filter((_, index) => index !== randomIndex);
      });
    } else {
      setShowFail(true);
    }
  }
  return (
    <div
      className={`relative w-screen h-full bg-white flex flex-col gap-6 min-h-screen items-center justify-start py-2 ${showFail ? "opacity-40" : ""}`}
    >
      {showFail && (
        <FailPopup
          onReset={() =>
            setPuzzles(Array.from({ length: initialPuzzlePieces }, (_, i) => i))
          }
          show={showFail}
          onClose={() => setShowFail(false)}
        />
      )}
      <p className="text-3xl text-black">لعبة صندوق الموسيقى</p>
      <p className="text-xl text-gray-800">
        أكمل الأبيات الشعرية لتتحصل على صورة الة الموسيقى
      </p>
      <div className="relative max-w-[800px] h-[450px]">
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
          src="/music-box/guitare.png"
          alt="guitare"
          className="z-0 h-[450px] w-[450px]"
        />
      </div>
      {puzzles.length > 0 && (
        <OptionsSelect
          onSelect={onSelect}
          options={MUSIC_BOX_DATA[initialPuzzlePieces - puzzles.length]}
        />
      )}
    </div>
  );
}
