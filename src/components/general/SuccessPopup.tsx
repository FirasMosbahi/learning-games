import Popup from "@learning-game/components/general/Popup";

export default function SuccessPopup({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  // Create a ref for the audio element

  return show ? (
    <Popup
      audioSrc="/sucess.mp3"
      className="w-[400px] h-[320px]"
      onClose={onClose}
    >
      <div className="text-xl py-8">
        <p className="text-3xl text-center">أحسنت المحاولة خطوة جيدة للأمام</p>
      </div>
    </Popup>
  ) : null;
}
