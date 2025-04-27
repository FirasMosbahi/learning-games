import GameCard from "@learning-game/components/landing-page/GameCard";
import { LandingPageContent } from "@learning-game/data/landing-page-content";
import { PageProps } from "@learning-game/types/page-props";

export default async function Home(props: PageProps) {
  const year = Number.parseInt((props.searchParams["level"] ?? "1") as string);
  return (
    <section
      className="flex flex-row text-gray-600 body-font w-screen min-h-screen bg-white"
      style={{
        backgroundImage: `url('/background/4.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
