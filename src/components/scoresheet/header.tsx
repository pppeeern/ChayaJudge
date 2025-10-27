"use client";
import Link from "next/link";
import {
  User,
  X,
  ChevronDown,
  Edit,
  Edit3,
  Trash,
  Plus,
} from "@deemlol/next-icons";
import { Dropdown } from "../Dropdown";
import { Divider } from "../Divider";
import { useResult } from "@/app/scoresheet/[name]/resultProvider";
import { RoundType } from "@/app/scoresheet/[name]/page";

export default function Header({
  title,
  rounds,
}: {
  title: string;
  rounds: RoundType[];
}) {
  interface menuItem {
    name: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    action?: () => void;
  }

  const competitionMenuItems: menuItem[] = [
    { name: "Rename", icon: Edit3 },
    { name: "Edit", icon: Edit },
    { name: "Delete", icon: Trash },
  ];

  const { round, setRoundSelect } = useResult();

  return (
    <div className="sticky top-0 z-20 border-b border-gray-300 bg-white px-8 py-2 h-14">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-5">
          <Link
            href={"/"}
            className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-colors duration-100 ease-in"
          >
            <X size={18} color="var(--color-gray-600)" />
          </Link>
          <div className="flex gap-0.5">
            <div className="inline-flex items-center gap-1 rounded-md px-1.5 hover:bg-gray-100 transition-colors duration-75">
              <Link href={"/"}>
                <span className="text-sm text-gray-600 hover:text-blue-500 transition-colors duration-75">
                  Competitions
                </span>
              </Link>
            </div>
            <div>
              <span className="text-sm font-light text-gray-600">/</span>
            </div>
            <Dropdown
              inner={
                <div className="inline-flex items-center gap-1 rounded-md pl-1.5 pr-1 cursor-pointer hover:bg-gray-100 transition-colors duration-75">
                  <span className="font-semibold whitespace-nowrap text-ellipsis">
                    {title}
                  </span>
                  <ChevronDown
                    size={14}
                    color="var(--color-gray-500)"
                    className="translate-y-0.5"
                  />
                </div>
              }
            >
              <div className="flex flex-col p-1 w-30">
                {competitionMenuItems.map(
                  ({ name, icon: Icon, action }, index) => {
                    const seperateAt = 1;
                    return (
                      <div key={index}>
                        {index > seperateAt && (
                          <div className="-mx-1">
                            <Divider />
                          </div>
                        )}
                        <button className="w-full inline-flex items-center text-left gap-2 rounded-md px-2 py-1 text-sm cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                          {Icon && <Icon size={12} />}
                          {name}
                        </button>
                      </div>
                    );
                  }
                )}
              </div>
            </Dropdown>
            <div>
              <span className="text-sm font-light text-gray-600">/</span>
            </div>
            <div>
              <span className="text-sm text-gray-600 pl-2 pr-1">Round :</span>
              <Dropdown
                inner={
                  <div className="inline-flex items-center gap-1 rounded-md pl-1.5 pr-1 cursor-pointer hover:bg-gray-100 transition-colors duration-75">
                    <span
                      className={`font-semibold whitespace-nowrap text-ellipsis text-blue-500`}
                    >
                      {round ? round : "None"}
                    </span>
                    <ChevronDown
                      size={14}
                      color="var(--color-gray-500)"
                      className="translate-y-0.5"
                    />
                  </div>
                }
              >
                <div className="flex flex-col w-44">
                  <div className="flex flex-col max-h-40 p-1 overflow-y-auto">
                    {rounds &&
                      rounds.map(({ id, name }) => {
                        const isSelected = round == name;
                        return (
                          <p
                            key={id}
                            onClick={() => setRoundSelect(name)}
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
                      Add round
                    </button>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2 h-8 rounded-md border border-gray-300">
          <span className="inline-flex items-center justify-center bg-gray-500 h-5 w-5 rounded-full overflow-hidden">
            <User size={14} color="var(--color-white)" />
          </span>
          <span className="text-sm font-medium text-gray-600">Chaya</span>
          {/* <ChevronDown size={14} className="translate-y-0.5 text-gray-500" /> */}
        </div>
      </div>
    </div>
  );
}
