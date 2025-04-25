"use client";

import React from "react";
import Image from "next/image";
import { OptionSelectType } from "@learning-game/types/option-select-type";

export default function Level({
  option,
  onSuccess,
  onFailure,
  level,
}: {
  option: OptionSelectType;
  onSuccess: () => void;
  onFailure: () => void;
  level: string;
}) {
  function onClick(image: string) {
    if (image === option.missingImage) {
      onSuccess();
    } else {
      onFailure();
    }
  }
  return (
    <div className="z-30 opacity-100 absolute top-[10%] left-[10%] bg-white border border-solid border-black rounded-xl min-w-[80%] h-[80%]">
      <p className="w-full text-center text-xl text-black py-4">
        أكمل الأبيات الشعرية لتنتقل السفينة إلى الجزيرة التالية
      </p>
      <div className="flex flex-row justify-between">
        <div className="w-[70%] my-32 mx-2 text-black h-full justify-center items-center text-3xl flex flex-row gap-x-8">
          {option.text.map((t, index) => (
            <p className="w-full text-nowrap" key={index}>
              {t}
            </p>
          ))}
        </div>
        <div className="w-[50%] flex flex-row flex-wrap justify-center items-center gap-12">
          {option.images.map((option, i) => (
            <Image
              alt="ship level option"
              width={500}
              height={500}
              key={i}
              onClick={() => onClick(option)}
              src={`/ship-images/${level}/${option}`}
              className="w-[200px] h-[200px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
