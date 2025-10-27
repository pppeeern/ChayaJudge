"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type scoreVal = number | string | null;
type scoreType = Record<number, scoreVal>;
type sectionType = Record<number, boolean>;

type resultContextType = {
  // SCORE
  score: scoreType;
  sectionComplete: sectionType;
  sectionRemains: Record<number, number>;
  setMissionScore: (
    sectionId: number,
    missionId: number,
    value: scoreVal
  ) => void;
  getTotalScore: () => scoreVal;
  resetScore: () => void;
  getSectionRemain: (sectionId: number) => any;

  // TIMER
  secs: number;
  tens: number;
  actualTime: number;
  isRunning: boolean;
  setTimerStart: () => void;
  setTimerReset: () => void;

  // TEAM
  selectedTeam: string | undefined;
  selectTeam: (name: string) => any;

  // ROUND
  round: string | undefined;
  setRoundSelect: (name: string) => any;
};

const ResultContext = createContext<resultContextType | undefined>(undefined);

export function ResultProvider({
  children,
  sectionMap,
  missionMap,
}: {
  children: React.ReactNode;
  sectionMap: Record<number, number[]>;
  missionMap: Record<number, any>;
}) {
  // SCORE PROVIDER
  const [score, setScore] = useState<scoreType>({});
  const [sectionComplete, setSectionComplete] = useState<sectionType>({});
  const [sectionRemains, setSectionRemains] = useState<Record<number, number>>(
    {}
  );

  React.useEffect(() => {
    const initialRemains: Record<number, number> = {};

    Object.entries(sectionMap).forEach(([sectionId, missions]) => {
      if (!missions.length) return;
      const firstMission = missionMap[missions[0]];
      if (!firstMission) return;

      const max = Number(firstMission.type) || 0;
      initialRemains[Number(sectionId)] = max;
    });

    setSectionRemains(initialRemains);
  }, [sectionMap, missionMap]);

  function checkSectionComplete(
    sectionId: number,
    scores: Record<number, any>
  ) {
    const missions = sectionMap[sectionId] || [];
    if (missions.length == 0) return false;

    return missions.every((mId) => scores[mId] != null);
  }

  function calSectionRemains(sectionId: number, scores: scoreType) {
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

    const remain = MAX - USED;
    return Math.max(remain, 0);
  }

  const setMissionScore = (
    sectionId: number,
    missionId: number,
    value: scoreVal
  ) => {
    setScore((prev) => {
      const updated = {
        ...prev,
        [missionId]: value === prev[missionId] ? null : value,
      };

      const completed = checkSectionComplete(sectionId, updated);
      setSectionComplete((prev) => ({
        ...prev,
        [sectionId]: completed,
      }));

      const remain = calSectionRemains(sectionId, updated);
      setSectionRemains((prev) => ({
        ...prev,
        [sectionId]: remain,
      }));

      return updated;
    });
  };

  const getTotalScore = () => {
    const values = Object.values(score);

    const stringScore = values.find((value) => typeof value == "string");
    if (stringScore) return stringScore;

    return values.reduce<number>((total, value) => {
      if (typeof value === "number") return total + value;
      return total;
    }, 0);
  };

  const resetScore = () => {
    setScore({}), setSectionComplete({}), setSectionRemains({});
  };

  const getSectionRemain = (sectionId: number) => {
    const missions = sectionMap[sectionId] || [];
    const remain: Record<number, number> = {};

    let _max = 0,
      _used = 0,
      _left = 0;

    missions.forEach((mId) => {
      const mission = missionMap[mId];
      if (!mission) return;

      const max = Number(mission.type);
      const value = score[mId];
      const count =
        typeof value === "number"
          ? value / (mission.max_score / (max || 1))
          : 0;

      _max = max;
      _used += count;
      _left = _max - _used;
      if (!score[mId]) remain[mId] = _left;
    });

    return remain;
  };

  // TIMER PROVIDER
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState<number>(0);

  const setTimerStart = () => {
    setIsRunning((prev) => !prev);
  };

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

  // TEAM PROVIDER
  const [selectedTeam, setSelectedTeam] = useState<string>();

  const selectTeam = (name: string) => {
    if (selectedTeam == name) setSelectedTeam(undefined);
    else setSelectedTeam(name);
  };

  // ROUND PROVIDER
  const [round, setRound] = useState<string>();

  const setRoundSelect = (name: string) => {
    if (round == name) setRound(undefined);
    else setRound(name);
  };

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
  const cont = useContext(ResultContext);
  if (!cont) throw new Error();
  return cont;
}
