"use client";
import { useResult } from "@/app/scoresheet/[name]/resultProvider";

import ConfirmModal from "@/components/ConfirmModal";
import { Dropdown } from "@/components/Dropdown";
import { Image, File, Download } from "@deemlol/next-icons";
import { useState } from "react";

export default function ActionSection({
  sectionLength,
}: {
  sectionLength: number;
}) {
  const {
    score,
    sectionComplete,
    resetScore,
    actualTime,
    setTimerReset,
    selectedTeam,
    selectTeam,
    round,
    setRoundSelect,
  } = useResult();

  const completedLength = Object.values(sectionComplete).length;
  const isCompleted =
    actualTime > 0 &&
    completedLength == sectionLength &&
    Object.values(sectionComplete).every(Boolean) &&
    selectedTeam &&
    (round || "None");

  const isProgress =
    actualTime > 0 ||
    Object.values(score).some((s) => s != null) ||
    selectedTeam ||
    round;

  const [submitModal, setSubmitModal] = useState<boolean>(false);
  const [clearModal, setClearModal] = useState<boolean>(false);

  function resetSheet() {
    resetScore();
    setTimerReset();
    selectTeam("");
    setRoundSelect("");
  }

  interface exportItem {
    name: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    action: any;
  }
  const exportAction: exportItem[] = [
    { name: "Export as PNG", icon: Image, action: "" },
    { name: "Export as JPG", icon: Image, action: "" },
    { name: "Export as PDF", icon: File, action: "" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* Submit */}
      <button
        type="button"
        onClick={() => setSubmitModal(true)}
        className={`outline-0 inline-flex items-center justify-center gap-1.5 py-1.5 pl-2.5 pr-3 mx-6 rounded-md border cursor-pointer group transition-color duration-200 ${
          isCompleted
            ? "bg-blue-500 border-blue-200 hover:bg-[oklch(0.5721_0.1895_259.27)] text-white"
            : "bg-gray-100 border-gray-300 pointer-events-none"
        }`}
      >
        <span
          className={`text-sm  font-medium transition-color duration-100 ${
            isCompleted ? "text-white" : "text-gray-400"
          }`}
        >
          Submit
        </span>
      </button>

      {submitModal && (
        <ConfirmModal
          title="Submit Data?"
          message={
            <>
              Are you sure you want to finalize and submit all data? <br /> You
              won’t be able to edit it again.
            </>
          }
          confirmText="Submit"
          confirmStyle="primary"
          onConfirm={() => {
            resetSheet();
            setSubmitModal(false);
          }}
          onCancel={() => setSubmitModal(false)}
        />
      )}

      {/* Clear */}
      <button
        type="button"
        onClick={() => setClearModal(true)}
        className={`outline-0 inline-flex items-center justify-center gap-1.5 py-1.5 pl-2.5 pr-3 mx-6 rounded-md border border-gray-300 cursor-pointer group transition-color duration-200 ${
          isProgress
            ? "bg-gray-50 hover:bg-gray-100"
            : "bg-gray-100 pointer-events-none"
        }`}
      >
        <span
          className={`text-sm font-medium transition-color duration-100 ${
            isProgress ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Clear
        </span>
      </button>

      {clearModal && (
        <ConfirmModal
          title="Clear Data"
          message={
            <>
              Are you sure you want to remove all data from this sheet? <br />
              This action cannot be undone.
            </>
          }
          confirmText="Clear"
          confirmStyle="danger"
          onConfirm={() => {
            resetSheet();
            setClearModal(false);
          }}
          onCancel={() => setClearModal(false)}
        />
      )}

      {/* Export */}
      {/* {<Dropdown
        className={"mx-6"}
        fullWidth={true}
        inner={
          <div
            className={`w-full inline-flex items-center justify-center gap-1.5 py-1.5 pl-2.5 pr-3 rounded-md border border-gray-300 cursor-pointer group transition-color duration-200 ${
              isCompleted
                ? "bg-gray-50 hover:bg-gray-100"
                : "bg-gray-100 pointer-events-none"
            }`}
          >
            <span
              className={`text-sm font-medium transition-color duration-100 ${
                isCompleted ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Export
            </span>
          </div>
        }
      >
        {isCompleted && (
          <div className="flex flex-col p-1">
            {exportAction.map(({ name, action }, index) => {
              return (
                <p
                  key={index}
                  onClick={() => action}
                  className={`inline-flex items-center justify-between group text-sm px-2 py-1 rounded-md cursor-pointer font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100`}
                >
                  {name}
                  <Download
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in-out"
                  />
                </p>
              );
            })}
          </div>
        )}
      </Dropdown>} */}
    </div>
  );
}
