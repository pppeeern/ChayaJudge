import { supabase } from "@/config/supabaseClient";
import { ResultProvider } from "./resultProvider";

import Header from "@/components/scoresheet/header";
import LeftSideBar from "@/components/scoresheet/leftbar";
import RightSideBar from "@/components/scoresheet/rightbar";
import Sheet from "@/components/scoresheet/sheet";

async function fetchComp(searchParams: { id?: string }) {
  const sp = await searchParams;
  const id = Number(sp.id);
  const { data, error } = await supabase
    .from("competitions")
    .select(
      `*, sections(*, missions(*, options(*))), comp_enrolls(teams(id, name)), rounds(*)`
    )
    .eq("id", id)
    .single();

  if (error) console.error("Could not fetch data: ", error);
  if (data) return data;
}

export default async function Scoresheet({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const comp = await fetchComp(searchParams);

  const sectionMap =
    comp?.sections?.reduce((acc: Record<number, number[]>, section: any) => {
      acc[section.id] = section.missions?.map((m: any) => m.id) || [];
      return acc;
    }, {}) || {};

  const missionMap =
    comp?.sections?.reduce((acc: Record<number, number[]>, section: any) => {
      section.missions?.forEach((m: any) => {
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
