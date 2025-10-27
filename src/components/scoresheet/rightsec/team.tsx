"use client";
import { Users, ChevronDown } from "@deemlol/next-icons";
import { Dropdown } from "@/components/Dropdown";
import { Plus } from "@deemlol/next-icons";
import { useResult } from "@/app/scoresheet/[name]/resultProvider";
import SectionHeader from "./sectionHead";
import { CompEnrollType } from "@/app/scoresheet/[name]/page";

export default function TeamSection({ teams }: { teams: CompEnrollType[] }) {
  const { selectedTeam, selectTeam } = useResult();

  return (
    <div className="flex flex-col gap-2">
      <SectionHeader
        title="Team"
        resetFunction={() => selectTeam("")}
        activeCondition={Boolean(selectedTeam)}
      />
      <Dropdown
        className={"mx-6"}
        fullWidth={true}
        inner={
          <div className="w-full inline-flex items-center gap-2 pl-4 pr-3 py-1.5 border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-md min-h-6 cursor-pointer transition-colors duration-75 ease-in">
            <span>
              <Users size={14} color="var(--color-blue-500)" />
            </span>
            <span
              className={`font-semibold flex-1 text-left ${
                selectedTeam ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {selectedTeam || "Select team"}
            </span>
            <span>
              <ChevronDown size={14} color="var(--color-gray-600)" />
            </span>
          </div>
        }
      >
        <div className="flex flex-col">
          <div className="flex flex-col max-h-40 p-1 overflow-y-auto">
            {teams.length > 0 &&
              teams.map((t) => {
                const { id, name } = t.teams;
                const isSelected = name == selectedTeam;
                return (
                  <p
                    key={id}
                    onClick={() => selectTeam(name)}
                    className={`text-sm pl-2 py-1 rounded-md cursor-pointer font-medium hover:bg-gray-100 ${
                      isSelected
                        ? "text-blue-500 bg-blue-50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {name}
                  </p>
                );
              })}
          </div>
          <div className="border-t border-t-gray-300">
            <button className="inline-flex items-center gap-2 w-full py-2 px-3 text-left text-sm text-gray-500 cursor-pointer group hover:bg-gray-100 hover:text-gray-700 transition-colors duration-75 ease-in">
              <Plus
                size={14}
                className="text-gray-400 group-hover:text-gray-500 transition-colors duration-75 ease-in"
              />
              Add team
            </button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}
