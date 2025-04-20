import Popup from "@learning-game/components/general/Popup";
import Image from "next/image";
import { useRef } from "react";

export default function MusicBoxPopup({
  show,
  musicSrc,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
  musicSrc: string;
}) {
  // Create a ref for the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleImageClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  return show ? (
    <>
      <audio ref={audioRef} src={musicSrc} preload="auto" />

      <Popup audioSrc="" className="w-[400px] h-[552px]" onClose={onClose}>
        <div className="text-xl py-8">
          <p className="text-3xl text-center">
            أحسنت المحاولة خطوة جيدة للأمام
          </p>
          <p className="text-xl text-center my-4">
            اضغط على صندوق الموسيقى لتسمع صوت الالة
          </p>
          <Image
            className="px-8 py-4 cursor-pointer"
            src="/landing-page/music-box1.jpeg"
            alt="music box image"
            width={500}
            height={500}
            onClick={handleImageClick}
          />
        </div>
      </Popup>
    </>
  ) : null;
}
