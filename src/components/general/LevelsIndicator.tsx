"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function LevelsIndicator({
  levels,
  className,
}: {
  levels: string[];
  className?: string;
}) {
  const path = usePathname();
  const searchParams = useSearchParams();
  return (
    <div className="h-full flex flex-col z-50 gap-6 items-center justify-center">
      {levels.map((level, i) => (
        <Link
          className={`z-50 ${(searchParams.get("level") ?? 0) == i ? "bg-red-700 hover:bg-red-800 focus:ring-red-300" : "bg-green-700 hover:bg-green-800 focus:ring-green-300"} focus:outline-none text-xl text-white  focus:ring-4 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 w-32 text-center ${className}`}
          href={`${path}?level=${i}`}
          key={i}
        >
          {level}
        </Link>
      ))}
    </div>
  );
}
