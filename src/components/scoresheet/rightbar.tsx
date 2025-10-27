import TeamSection from "./rightsec/team";
import ScoreSection from "./rightsec/score";
import TimeSection from "./rightsec/time";
import ActionSection from "./rightsec/action";
import { CompetitionType } from "@/app/scoresheet/[name]/page";
import { Divider } from "../Divider";

export default function RightSideBar({ comp }: { comp: CompetitionType }) {
  return (
    <div className="h-full border-l border-l-gray-300">
      <div className="sticky top-0 flex flex-col gap-4 pt-4 h-[calc(100vh-3.5rem)]">
        <TeamSection teams={comp.comp_enrolls} />
        <Divider />
        <ScoreSection
          max_score={comp.max_score ?? 0}
          has_dis={comp.has_disqualify ?? false}
        />
        <Divider />
        <TimeSection max_time={comp.max_time ?? 0} />
        <Divider />
        <ActionSection sectionLength={comp.sections.length} />
      </div>
    </div>
  );
}
