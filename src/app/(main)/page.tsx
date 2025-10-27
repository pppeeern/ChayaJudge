import { supabase } from "@/config/supabaseClient";

import Card from "@/components/(main)/card";
import ConfigBar from "@/components/(main)/configbar";

export default async function Competitions() {
  async function fetchCompetitions() {
    const { data, error } = await supabase.from("competitions").select();

    if (error) console.error("Could not fetch data: ", error);
    if (data) return data;
  }

  const competitions = await fetchCompetitions();

  return (
    <div className="flex flex-col gap-4 w-full py-5">
      <ConfigBar compLength={competitions?.length} />
      {competitions && competitions.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
          {competitions.map((c) => (
            <Card key={c.id} data={c} />
          ))}
        </div>
      )}
    </div>
  );
}
