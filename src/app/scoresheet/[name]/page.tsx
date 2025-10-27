import { supabase } from "@/config/supabaseClient";
import { ResultProvider } from "./resultProvider";

import Header from "@/components/scoresheet/header";
import LeftSideBar from "@/components/scoresheet/leftbar";
import RightSideBar from "@/components/scoresheet/rightbar";
import Sheet from "@/components/scoresheet/sheet";

export type OptionType = {
  id: number;
  label: string;
  value?: string | number;
};

export type MissionType = {
  id: number;
  name: string;
  type: string;
  max_score: number;
  options?: OptionType[];
};

export type SectionType = {
  id: number;
  name: string;
  missions?: MissionType[];
};

export type TeamType = {
  id: number;
  name: string;
};

export type CompEnrollType = {
  teams: TeamType;
};

export type RoundType = {
  id: number;
  name: string;
  order?: number;
};

export type CompetitionType = {
  id: number;
  name: string;
  image_path: string;
  sections: SectionType[];
  comp_enrolls: CompEnrollType[];
  rounds: RoundType[];
  max_score?: number;
  has_disqualify?: boolean;
  max_time?: number;
};

async function fetchComp(searchParams: {
  id?: string;
}): Promise<CompetitionType | null> {
  const sp = await searchParams;
  const id = Number(sp.id);
  const { data, error } = await supabase
    .from("competitions")
    .select(
      `*, sections(*, missions(*, options(*))), comp_enrolls(teams(id, name)), rounds(*)`
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Could not fetch data: ", error);
    return null;
  }
  return data as CompetitionType;
}

export default async function Scoresheet({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const comp = await fetchComp(searchParams);
  if (!comp) return null;

  const sectionMap =
    comp.sections?.reduce((acc: Record<number, number[]>, section) => {
      acc[section.id] = section.missions?.map((m) => m.id) || [];
      return acc;
    }, {}) || {};

  const missionMap =
    comp.sections?.reduce((acc: Record<number, MissionType>, section) => {
      section.missions?.forEach((m) => {
        acc[m.id] = m;
      });
      return acc;
    }, {}) || {};

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <ResultProvider sectionMap={sectionMap} missionMap={missionMap}>
        <Header title={comp.name} rounds={comp.rounds} />
        <div className="flex-1 grid grid-cols-[16%_1fr_20%] overflow-y-auto">
          <LeftSideBar title={comp.name} section={comp.sections} />
          <Sheet section={comp.sections} />
          <RightSideBar comp={comp} />
        </div>
      </ResultProvider>
    </div>
  );
}
