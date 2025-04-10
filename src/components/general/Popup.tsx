import React from "react";

export default function Popup({
  children,
  title,
  onClose,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}) {
  return (
    <div
      className={`z-50 opacity-100 absolute top-[20%] left-[40%] bg-blue-300 border border-solid border-black rounded-xl w-[300px] ${className}`}
    >
      <div className="flex flex-row justify-between">
        {title && <p className="w-full text-center py-4">{title}</p>}
        <div className="flex flex-row justify-end w-full p-2">
          <CloseButton onClick={onClose} />
        </div>
      </div>
      {children}
    </div>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#f50000"
      className="size-8"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="Menu / Close_MD">
          {" "}
          <path
            id="Vector"
            d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
            stroke="#fa0000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
