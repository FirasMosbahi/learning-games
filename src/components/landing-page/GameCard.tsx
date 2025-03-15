import Image from "next/image";
import Link from "next/link";

type GameCardProps = {
  title: string;
  description: string;
  level: string;
  imageUrl: string;
  gameUrl: string;
};

export default function GameCard({
  title,
  description,
  level,
  imageUrl,
  gameUrl,
}: GameCardProps) {
  return (
    <div className="bg-white rounded-lg flex flex-col justify-between h-[520px] max-w-[320px]">
      <Image
        height={400}
        width={400}
        className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6"
        src={imageUrl}
        alt={title}
      />
      <div>
        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
          {level}
        </h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
          {title}
        </h2>
        <p className="leading-relaxed text-base text-sm mb-4">{description}</p>
      </div>
      <Link
        href={gameUrl}
        type="button"
        className="text-white w-32 text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        إبدأ اللعب
      </Link>
    </div>
  );
}
