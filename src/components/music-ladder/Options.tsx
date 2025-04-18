"use client";

import { OptionMultiSelectType } from "@learning-game/types/option-select-type";
import { useState } from "react";

const colorPalette = ["#B5B4D9", "#9CD3D9", "#F2D5CE", "#D0D991"];

export default function Options({
  options,
  onSuccess,
}: {
  options: OptionMultiSelectType;
  onSuccess: () => void;
}) {
  const [level, setLevel] = useState<number>(0);
  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="text-2xl text-black grid grid-cols-2 gap-y-2 justify-between gap-x-8">
        {options.text.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {options.options[level].options.map((option, index) => (
          <button
            className="text-2xl px-8 py-2 border border-solid border-transparent rounded-xl"
            style={{ backgroundColor: colorPalette[index] }}
            key={index}
            onClick={() => {
              if (level === 0) setLevel(1);
              else {
                setLevel(0);
                onSuccess();
              }
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
