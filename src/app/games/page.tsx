import GameCard from "@learning-game/components/landing-page/GameCard";
import { LandingPageContent } from "@learning-game/data/landing-page-content";
import { PageProps } from "@learning-game/types/page-props";
import { FIRST_YEAR_GAME_DATA } from "@learning-game/data/first-year-game-data";
import Link from "next/link";

const colorPalette = ["#B5B4D9", "#9CD3D9", "#F2D5CE", "#D0D991"];

export default async function Home(props: PageProps) {
  const year = Number.parseInt((props.searchParams["level"] ?? "1") as string);
  return (
    <section className="flex flex-row text-gray-600 body-font w-screen min-h-screen bg-white">
      <div className="w-[400px] flex flex-col items-center justify-start py-8 gap-12">
        <h1 className="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900">
          تجارب الأداء
        </h1>
        <div className="flex flex-col gap-6">
          {FIRST_YEAR_GAME_DATA.map((data, index) => (
            <Link
              className="px-4 py-2 text-xl w-32 text-center border border-transparent rounded-xl"
              style={{ backgroundColor: colorPalette[index % 4] }}
              href={`/music-play?level=${data.level}`}
              key={index}
            >
              {data.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="container px-5 py-6 mx-auto max-w-7x1">
        <div className="flex flex-wrap w-full mb-4 p-4">
          <div className="w-full text-center mb-6 lg:mb-0">
            <h1 className="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900">
              {LandingPageContent.welcome}
            </h1>
            <h2>{LandingPageContent.explaining}</h2>
            <h2>{LandingPageContent.callToAction}</h2>
          </div>
        </div>
        <div className="flex flex-wrap mx-auto w-full flex-col items-end pr-24 justify-center gap-12">
          {LandingPageContent.games
            .filter((g) => g.year === year)
            .map((game, index) => (
              <GameCard key={index} {...game} />
            ))}
        </div>
      </div>
    </section>
  );
}
