"use client";
import { PlayCircle, PauseCircle } from "@deemlol/next-icons";
import { useResult } from "@/app/scoresheet/[name]/resultProvider";
import SectionHeader from "./sectionHead";

export default function TimeSection({ max_time }: { max_time: number }) {
  const { secs, tens, actualTime, isRunning, setTimerStart, setTimerReset } =
    useResult();

  return (
    <div className="flex flex-col gap-2">
      <SectionHeader
        title="Time"
        resetFunction={setTimerReset}
        activeCondition={Boolean(actualTime)}
      />
      <div className="flex items-center justify-between mx-6">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-bold text-4xl ${
              actualTime > max_time ? "text-red-600" : "text-blue-500"
            }`}
          >
            {secs.toString().padStart(2, "0")}
          </span>
          <span className="text-gray-500">.</span>
          <span className="text-gray-500">
            {tens.toString().padStart(2, "0")}
          </span>
        </div>

        <button
          type="button"
          onClick={setTimerStart}
          className="outline-0 inline-flex items-center gap-1.5 bg-blue-500 py-1.5 pl-2.5 pr-3 rounded-md border border-gray-300 cursor-pointer group hover:bg-[oklch(0.5721_0.1895_259.27)] transition-color duration-200"
        >
          <span className="inline-flex items-center justify-center">
            {isRunning ? (
              <PauseCircle
                size={16}
                className="text-white transition-color duration-100"
              />
            ) : (
              <PlayCircle
                size={16}
                className="text-white transition-color duration-100"
              />
            )}
          </span>
          <span className="text-sm text-white font-medium transition-color duration-100">
            {isRunning ? "Stop" : "Start"}
          </span>
        </button>
      </div>
    </div>
  );
}
