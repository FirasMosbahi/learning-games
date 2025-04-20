import Popup from "@learning-game/components/general/Popup";

export default function FailPopup({
  show,
  onClose,
  onReset,
}: {
  show: boolean;
  onClose: () => void;
  onReset: () => void;
}) {
  return show ? (
    <Popup audioSrc="/fail.mp3" onClose={onClose}>
      <div className="text-xl py-8">
        <p className="text-3xl text-center">للأسف حاول مرة أخرى لا تستسلم !</p>
        <div className="flex flex-row justify-between mx-4 pt-8">
          <button
            onClick={onClose}
            className="bg-green-400 px-8 py-2 border border-solid rounded-xl"
          >
            أكمل
          </button>
          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            className="bg-red-400 px-8 py-2 border border-solid rounded-xl"
          >
            إعادة اللعبة
          </button>
        </div>
      </div>
    </Popup>
  ) : (
    <></>
  );
}
