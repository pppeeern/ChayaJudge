"use client";
import { useResult } from "@/app/scoresheet/[name]/resultProvider";
import { useState } from "react";

import { MinusCircle, XCircle } from "@deemlol/next-icons";
import SectionHeader from "./sectionHead";
import ConfirmModal from "@/components/ConfirmModal";

export default function ScoreSection({
  max_score,
  has_dis,
}: {
  max_score: number;
  has_dis: boolean;
}) {
  const { getTotalScore, resetScore, setMissionScore, selectedTeam } =
    useResult();
  const total = getTotalScore();

  const disText = "DIS";
  const dis = total == disText;
  const [disModal, setDisModal] = useState(false);
  const handleDis = () => {
    if (!dis) setMissionScore(0, 0, disText);
    else setMissionScore(0, 0, null);
  };

  return (
    <div className="flex flex-col gap-2">
      <SectionHeader
        title="Score"
        resetFunction={() => resetScore()}
        activeCondition={Boolean(total)}
      />
      <div className="flex items-center justify-between mx-6">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-bold text-4xl ${
              dis ? "text-red-600" : "text-blue-500"
            }`}
          >
            {total}
          </span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-500">{max_score}</span>
        </div>
        {has_dis && (
          <>
            <button
              type="button"
              onClick={() => {
                !dis ? setDisModal(true) : handleDis();
              }}
              className={`outline-0 inline-flex items-center gap-1.5 bg-gray-50 py-1.5 pl-2.5 pr-3 rounded-md border border-gray-300 cursor-pointer group transition-color duration-200 ${
                dis ? "hover:bg-gray-100" : "hover:bg-red-600"
              }`}
            >
              <span className="inline-flex items-center justify-center">
                {dis ? (
                  <XCircle
                    size={16}
                    className={`text-gray-600  transition-color duration-100`}
                  />
                ) : (
                  <MinusCircle
                    size={16}
                    className={`text-gray-600  transition-color duration-100 group-hover:text-white
                  `}
                  />
                )}
              </span>
              <span
                className={`text-sm text-gray-600 font-medium  transition-color duration-100 ${
                  dis ? "" : "group-hover:text-white"
                }`}
              >
                {dis ? "Cancel" : "Disqualify"}
              </span>
            </button>

            {disModal && !dis && (
              <ConfirmModal
                title={`Confirm Disqualify`}
                message={
                  <>
                    Are you sure you want to disqualify
                    {selectedTeam ? " " + selectedTeam : " this team"}?
                  </>
                }
                confirmText="Disqualify"
                confirmStyle="danger"
                onConfirm={() => {
                  handleDis();
                  setDisModal(false);
                }}
                onCancel={() => setDisModal(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
