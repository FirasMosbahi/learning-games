"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const levels = [
  "المستوى الأول",
  "المستوى الثاني",
  "المستوى الثالث",
  "المستوى الرابع",
];

export default function LevelsIndicator() {
  const path = usePathname();
  const searchParams = useSearchParams();
  return (
    <div className="h-full flex flex-col gap-6 items-center justify-center">
      {levels.map((level, i) => (
        <Link
          className={`${(searchParams.get("level") ?? 0) == i ? "bg-red-700 hover:bg-red-800 focus:ring-red-300" : "bg-green-700 hover:bg-green-800 focus:ring-green-300"} focus:outline-none text-xl text-white  focus:ring-4 font-medium rounded-lg px-5 py-2.5 me-2 mb-2`}
          href={`${path}?level=${i}`}
          key={i}
        >
          {level}
        </Link>
      ))}
    </div>
  );
}
