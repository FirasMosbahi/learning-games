"use client";

import Popup from "@learning-game/components/general/Popup";
import { useState } from "react";
import { Howl } from "howler";

const speed = [
  { label: "عادي", value: "" },
  { label: "بطيء", value: "-0" },
];
const actor = [
  { label: "رجل", value: "-man" },
  { label: "إمرأة", value: "-woman" },
  { label: "طفل", value: "-kid" },
];

export default function SuccessPopup({ level }: { level: number }) {
  const [speedChoice, setSpeedChoice] = useState("");
  const [actorChoice, setActorChoice] = useState("-man");
  function playAudio() {
    console.log(`/first-year-audio/${level}${speedChoice}${actorChoice}.mp3`);
    const howl = new Howl({
      src: `/first-year-audio/${level}${speedChoice}${actorChoice}.mp3`,
      volume: 1,
    });
    howl.play();
  }
  return (
    <Popup
      audioSrc=""
      title=""
      className="w-[700px] left-[0%]"
      onClose={() => {}}
    >
      <div>
        <div className="text-2xl w-full text-center flex flex-col gap-y-4">
          <p>تهانينا لقد ربحت</p>
          <p>إختر سرعة و شخصية لسماع الأنشودة</p>
        </div>
        <div className="flex flex-col mb-6 mt-12 justify-center items-center gap-y-4 text-xl">
          <div className="flex flex-row gap-8">
            {speed.map((item, i) => (
              <button
                className={`border cursor-pointer ${item.value === speedChoice ? "border-transparent bg-white text-blue-400" : "border-white"} rounded-xl px-4 py-2`}
                key={i}
                onClick={() => setSpeedChoice(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-row gap-8">
            {actor.map((item, i) => (
              <button
                className={`border cursor-pointer ${item.value === actorChoice ? "border-transparent bg-white text-blue-400" : "border-white"} rounded-xl px-4 py-2`}
                key={i}
                onClick={() => setActorChoice(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center mt-12 mb-4">
          <button
            onClick={playAudio}
            className="text-xl cursor-pointer border border-white px-4 py-2 rounded-xl"
          >
            إقرأ المحفوطات
          </button>
        </div>
      </div>
    </Popup>
  );
}
