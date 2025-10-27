"use client";
import { useResult } from "@/app/scoresheet/[name]/resultProvider";

import { Check } from "@deemlol/next-icons";

export default function Option({
  sectionId,
  missionId,
  type,
  mscore,
  options,
}: {
  sectionId: number;
  missionId: number;
  type: string;
  mscore: number;
  options?: { label: string; value: number }[];
}) {
  const { setMissionScore, score, sectionRemains } = useResult();
  const currentValue = score[missionId];

  if (type == "check") {
    return (
      <div className="justify-self-end w-fit h-fit flex items-center rounded-md overflow-hidden border border-gray-300">
        <OptionButton
          label={<Check size={14} />}
          value={mscore}
          square={true}
        />
      </div>
    );
  }
  if (type == "radio") {
    return (
      <div className="justify-self-end w-fit h-fit flex items-center rounded-md overflow-hidden border border-gray-300">
        {options?.map((opt, index) => (
          <OptionButton key={index} label={opt.label} value={opt.value} />
        ))}
      </div>
    );
  }

  if (Number(type)) {
    const max = Number(type);
    const unit = mscore / max;

    const remain = sectionRemains[sectionId] ?? max;

    const currentCount =
      typeof currentValue === "number" ? Math.round(currentValue / unit) : 0;

    const allowed = Math.max(
      currentCount,
      Math.min(max, currentCount + remain)
    );

    const buttons = Array.from({ length: max + 1 }, (_, i) => {
      const val = unit * i;
      const dis = i > allowed;

      return (
        <OptionButton key={i} label={i} value={val} square={true} dis={dis} />
      );
    });

    return (
      <div className="justify-self-end w-fit h-fit flex items-center rounded-md overflow-hidden border border-gray-300">
        {buttons}
      </div>
    );
  }

  return null;

  function OptionButton({
    label,
    value,
    square,
    dis,
  }: {
    label: any;
    value: number;
    square?: boolean;
    dis?: boolean;
  }) {
    const isSelected = currentValue == value;
    return (
      <button
        type="button"
        onClick={() => {
          if (dis) return;
          if (!isSelected) setMissionScore(sectionId, missionId, value);
          else setMissionScore(sectionId, missionId, null);
        }}
        className={`inline-flex items-center justify-center min-w-6 h-6 text-sm font-medium cursor-pointer outline outline-gray-300 transition-colors duration-100 ease-in ${
          square ? "aspect-square" : "px-1.5 py-1"
        } ${
          isSelected
            ? "bg-blue-500 text-white"
            : "bg-gray-50 hover:bg-gray-200 text-black"
        } ${dis ? "bg-gray-200 text-gray-500" : ""}`}
      >
        {label}
      </button>
    );
  }
}
