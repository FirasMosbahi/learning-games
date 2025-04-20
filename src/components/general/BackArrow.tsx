"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackArrow() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="absolute z-10 bg-blue-300 flex flex-row items-center justify-center top-10 right-44 size-12 border border-transparent rounded-full"
    >
      <Image
        src="/back-arrow.png"
        alt="home"
        width={500}
        height={500}
        className="size-9"
      />
    </div>
  );
}
