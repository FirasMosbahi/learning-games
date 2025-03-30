import { OptionSelectType } from "@learning-game/types/option-select-type";

export default function OptionsSelect({
  options,
  onSelect,
}: {
  options: OptionSelectType;
  onSelect: (option: string) => void;
}) {
  const colorPalette = ["#B5B4D9", "#9CD3D9", "#F2D5CE", "#D0D991"];
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-black text-3xl flex flex-row gap-x-8">
        {options.text.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
      <div className="flex flex-row gap-8">
        {options.options.map((option, index) => (
          <button
            className="text-2xl px-8 py-2 border border-solid border-transparent rounded-xl"
            style={{ backgroundColor: colorPalette[index] }}
            key={index}
            onClick={() => {
              onSelect(option);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
