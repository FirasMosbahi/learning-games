"use client";

import { PageProps } from "@learning-game/types/page-props";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Page(props: PageProps) {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const page = Number.parseInt((props.searchParams?.level ?? "0") as string);
  const handleImageClick = (audioFile: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Create new audio element
    audioRef.current = new Audio(`/first-year-audio/${page}-${audioFile}.mp3`);
    audioRef.current
      .play()
      .then(() => setCurrentAudio(audioFile))
      .catch((error) => console.error("Audio playback failed:", error));
  };
  return (
    <div className="w-screen h-screen bg-white flex flex-row items-center justify-center">
      <audio
        src={currentAudio ? `/audio/${currentAudio}.mp3` : undefined}
        onEnded={() => setCurrentAudio(null)}
      />
      <div className="w-[60%]">
        <Image
          src={`/music-pics/${page}.png`}
          className="w-full h-full max-h-screen"
          alt="music-pic"
          width={500}
          height={500}
        />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-y-8">
        <div className="flex flex-row justify-center items-center">
          <Image
            src="/music-pics/speed.png"
            className="w-[240px] h-[70px]"
            alt="speed"
            height={200}
            width={600}
          />
        </div>
        <div className="flex flex-row justify-center items-center">
          <Image
            src="/music-pics/actor.png"
            className="w-[160px] h-[70px]"
            alt="speed"
            height={200}
            width={600}
          />
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer gap-4">
          <Image
            src="/music-pics/quick.png"
            className="w-[240px] h-[60px]"
            alt="quick"
            width={400}
            height={200}
            onClick={() => handleImageClick("man")}
          />
          <Image
            src="/music-pics/slow.png"
            className="w-[240px] h-[50px] cursor-pointer"
            alt="slow"
            width={400}
            height={200}
            onClick={() => handleImageClick("0-man")}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/music-pics/man.png"
            className="w-[160px] h-[160px] mx-4"
            alt="man"
            height={400}
            width={400}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/music-pics/quick.png"
            className="w-[240px] h-[60px] cursor-pointer"
            alt="quick"
            width={400}
            height={200}
            onClick={() => handleImageClick("woman")}
          />
          <Image
            src="/music-pics/slow.png"
            className="w-[240px] h-[50px] cursor-pointer"
            alt="slow"
            width={400}
            height={200}
            onClick={() => handleImageClick("0-woman")}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/music-pics/woman.png"
            className="w-[160px] h-[160px] mx-4"
            alt="man"
            height={400}
            width={400}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/music-pics/quick.png"
            className="w-[240px] h-[60px] cursor-pointer"
            alt="quick"
            width={400}
            height={200}
            onClick={() => handleImageClick("kid")}
          />
          <Image
            src="/music-pics/slow.png"
            className="w-[240px] h-[50px] cursor-pointer"
            alt="slow"
            width={400}
            height={200}
            onClick={() => handleImageClick("0-kid")}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/music-pics/kid.png"
            className="w-[160px] h-[160px] mx-4"
            alt="man"
            height={400}
            width={400}
          />
        </div>
      </div>
    </div>
  );
}
