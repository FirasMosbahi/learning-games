import GameCard from "@learning-game/components/landing-page/GameCard";
import { LandingPageContent } from "@learning-game/data/landing-page-content";

export default function Home() {
  return (
    <section className="text-gray-600 body-font w-screen min-h-screen bg-white">
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
        <div className="flex flex-wrap mx-auto flex-row items-center justify-center gap-y-4 gap-x-8">
          {LandingPageContent.games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
      </div>
    </section>
  );
}
