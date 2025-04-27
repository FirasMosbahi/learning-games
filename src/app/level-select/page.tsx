import { PageProps } from "@learning-game/types/page-props";
import Link from "next/link";
import { FIRST_YEAR_GAME_DATA } from "@learning-game/data/first-year-game-data";
import { SECOND_YEAR_GAME_DATA } from "@learning-game/data/second-year-game-data";

export default function Page(props: PageProps) {
  return (
    <div
      className="w-screen h-screen bg-white flex flex-col items-center"
      style={{
        backgroundImage: `url('/background/1.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-center text-black text-5xl py-8">اختر أنشودة</h1>
      <div className="w-[480px] my-16 grid grid-cols-3 gap-x-4 gap-y-8 z-50 gap-6 items-center justify-center">
        {props.searchParams.level === "1" &&
          FIRST_YEAR_GAME_DATA.map((l, i) => (
            <Link
              className={`z-50 bg-green-700 hover:bg-green-800 focus:ring-green-300 focus:outline-none text-xl text-white  focus:ring-4 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 w-32 text-center`}
              href={`/${props.searchParams.game}?level=${l.level}&student=1`}
              key={i}
            >
              {l.title}
            </Link>
          ))}
        {props.searchParams.level === "2" &&
          SECOND_YEAR_GAME_DATA.map((l, i) => (
            <Link
              className={`z-50 bg-green-700 hover:bg-green-800 focus:ring-green-300 focus:outline-none text-xl text-white  focus:ring-4 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 w-40 text-center`}
              href={`/${props.searchParams.game}?level=${l.level}&student=2`}
              key={i}
            >
              {l.title}
            </Link>
          ))}
      </div>
    </div>
  );
}
