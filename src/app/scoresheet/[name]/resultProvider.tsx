"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { MissionType } from "@/app/scoresheet/[name]/page";

type ScoreVal = number | string | null;
type ScoreMap = Record<number, ScoreVal>;
type SectionCompleteMap = Record<number, boolean>;
type SectionRemainMap = Record<number, number>;

type ResultContextType = {
  // SCORE
  score: ScoreMap;
  sectionComplete: SectionCompleteMap;
  sectionRemains: SectionRemainMap;
  setMissionScore: (
    sectionId: number,
    missionId: number,
    value: ScoreVal
  ) => void;
  getTotalScore: () => ScoreVal;
  resetScore: () => void;
  getSectionRemain: (sectionId: number) => Record<number, number>;

  // TIMER
  secs: number;
  tens: number;
  actualTime: number;
  isRunning: boolean;
  setTimerStart: () => void;
  setTimerReset: () => void;

  // TEAM
  selectedTeam?: string;
  selectTeam: (name: string) => void;

  // ROUND
  round?: string;
  setRoundSelect: (name: string) => void;
};

type ResultProviderProps = {
  children: React.ReactNode;
  sectionMap: Record<number, number[]>;
  missionMap: Record<number, MissionType>;
};

const ResultContext = createContext<ResultContextType | undefined>(undefined);

export function ResultProvider({
  children,
  sectionMap,
  missionMap,
}: ResultProviderProps) {
  // SCORE
  const [score, setScore] = useState<ScoreMap>({});
  const [sectionComplete, setSectionComplete] = useState<SectionCompleteMap>(
    {}
  );
  const [sectionRemains, setSectionRemains] = useState<SectionRemainMap>({});

  useEffect(() => {
    const initialRemains: SectionRemainMap = {};
    Object.entries(sectionMap).forEach(([sectionId, missions]) => {
      if (!missions.length) return;
      const firstMission = missionMap[missions[0]];
      if (!firstMission) return;
      const max = Number(firstMission.type) || 0;
      initialRemains[Number(sectionId)] = max;
    });
    setSectionRemains(initialRemains);
  }, [sectionMap, missionMap]);

  const checkSectionComplete = (sectionId: number, scores: ScoreMap) => {
    const missions = sectionMap[sectionId] || [];
    if (!missions.length) return false;
    return missions.every((mId) => scores[mId] != null);
  };

  const calSectionRemains = (sectionId: number, scores: ScoreMap) => {
    const missions = sectionMap[sectionId] || [];
    if (!missions.length) return 0;

    let MAX = 0;
    let USED = 0;

    for (const mId of missions) {
      const mission = missionMap[mId];
      if (!mission) continue;
      MAX = Number(mission.type) || 0;
      const value = scores[mId];
      if (typeof value === "number") {
        const unit = mission.max_score / (MAX || 1);
        USED += value / unit;
      }
    }
    return Math.max(MAX - USED, 0);
  };

  const setMissionScore = (
    sectionId: number,
    missionId: number,
    value: ScoreVal
  ) => {
    setScore((prev) => {
      const updated = {
        ...prev,
        [missionId]: value === prev[missionId] ? null : value,
      };
      setSectionComplete((prev) => ({
        ...prev,
        [sectionId]: checkSectionComplete(sectionId, updated),
      }));
      setSectionRemains((prev) => ({
        ...prev,
        [sectionId]: calSectionRemains(sectionId, updated),
      }));
      return updated;
    });
  };

  const getTotalScore = () => {
    const values = Object.values(score);
    const stringScore = values.find((v) => typeof v === "string");
    if (stringScore) return stringScore;
    return values.reduce<number>(
      (total, v) => (typeof v === "number" ? total + v : total),
      0
    );
  };

  const resetScore = () => {
    setScore({});
    setSectionComplete({});
    setSectionRemains({});
  };

  const getSectionRemain = (sectionId: number) => {
    const missions = sectionMap[sectionId] || [];
    const remain: Record<number, number> = {};

    missions.forEach((mId) => {
      const mission = missionMap[mId];
      if (!mission) return;
      const max = Number(mission.type) || 0;
      const value = score[mId];
      const count =
        typeof value === "number"
          ? value / (mission.max_score / (max || 1))
          : 0;
      const left = max - count;
      if (!score[mId]) remain[mId] = left;
    });

    return remain;
  };

  // TIMER
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const setTimerStart = () => setIsRunning((prev) => !prev);
  const setTimerReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setTime((prev) => prev + 10), 10);
    return () => clearInterval(interval);
  }, [isRunning]);

  const secs = Math.floor(time / 1000);
  const tens = Math.floor((time / 10) % 100);
  const actualTime = time / 1000;

  // TEAM
  const [selectedTeam, setSelectedTeam] = useState<string>();
  const selectTeam = (name: string) =>
    setSelectedTeam((prev) => (prev === name ? undefined : name));

  // ROUND
  const [round, setRound] = useState<string>();
  const setRoundSelect = (name: string) =>
    setRound((prev) => (prev === name ? undefined : name));

  return (
    <ResultContext.Provider
      value={{
        score,
        sectionComplete,
        sectionRemains,
        setMissionScore,
        getTotalScore,
        resetScore,
        getSectionRemain,
        secs,
        tens,
        actualTime,
        isRunning,
        setTimerStart,
        setTimerReset,
        selectedTeam,
        selectTeam,
        round,
        setRoundSelect,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
}

export function useResult() {
  const context = useContext(ResultContext);
  if (!context)
    throw new Error("useResult must be used within a ResultProvider");
  return context;
}
