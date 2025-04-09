"use client";

import React from "react";
import Image from "next/image";
import { OptionSelectType } from "@learning-game/types/option-select-type";

export default function Level({
  option,
  onSuccess,
  level,
}: {
  option: OptionSelectType;
  onSuccess: () => void;
  level: string;
}) {
  function onClick(image: string) {
    if (image === option.missingImage) {
      onSuccess();
    }
  }
  return (
    <div className="z-30 opacity-100 absolute top-[10%] left-[10%] bg-white border border-solid border-black rounded-xl w-[80%] h-[80%]">
      <p className="w-full text-center text-xl text-black py-4">
        أكمل الأبيات الشعرية لتنتقل السفينة إلى الجزيرة التالية
      </p>
      <div className="flex flex-row justify-between gap-[20%]">
        <div className="stage w-[50%] flex flex-col items-center justify-center gap-8 py-32">
          <div className="text-black text-3xl flex flex-row gap-x-8">
            {option.text.map((t, index) => (
              <p key={index}>{t}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-12">
            {option.images.map((option, i) => (
              <Image
                alt="ship level option"
                width={500}
                height={500}
                key={i}
                onClick={() => onClick(option)}
                src={`/ship-images/${level}/${option}`}
              >
                {option}
              </Image>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
