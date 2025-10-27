"use client";
import { useResult } from "@/app/scoresheet/[name]/resultProvider";

import { Check } from "@deemlol/next-icons";
import { Divider } from "../Divider";

export default function LeftSideBar({
  title,
  section,
}: {
  title: string;
  section: { id: number; name: string }[];
}) {
  const { sectionComplete } = useResult();

  const toSection = (secName: string) => {
    const sec = document.getElementById(secName);
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth" });
      sec.classList.add("bg-blue-50", "shadow-md", "shadow-neutral-100");
      setTimeout(() => {
        sec.classList.remove("bg-blue-50", "shadow-md", "shadow-neutral-100");
      }, 500);
    }
  };

  return (
    <div className="h-full border-r border-r-gray-300">
      <div className="sticky top-0 pt-4 overflow-y-auto h-[calc(100vh-3.5rem)]">
        <div className="sticky top-0 bg-white flex flex-col gap-3 pb-4 border-b border-b-gray-300">
          <div className="pl-6 pr-5">
            <span className="text-xl font-semibold">{title}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-3 px-4">
          <h3 className="text-xs font-semibold pl-2">Sections</h3>
          <div className="h-full flex-1 overflow-y-auto">
            {section &&
              section.map((sec) => {
                const isComplete = sectionComplete[sec.id];
                return (
                  <button
                    key={sec.id}
                    onClick={() => toSection(sec.name)}
                    className="outline-0 inline-flex gap-2.5 items-center group rounded-md px-2 cursor-pointer transition-all ease-in duration-75 w-full py-2 hover:bg-gray-50"
                  >
                    <span
                      className={`inline-flex items-center justify-center h-4 w-4 aspect-square rounded-md ${
                        isComplete ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    >
                      {isComplete && (
                        <Check size={10} color="var(--color-white)" />
                      )}
                    </span>
                    <span className="text-sm truncate text-left text-gray-600 group-hover:text-black transition-colors duration-75 ease-in">
                      {sec.name}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
