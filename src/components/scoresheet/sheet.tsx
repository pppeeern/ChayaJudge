import Section from "./mission/section";
import { SectionType } from "@/app/scoresheet/[name]/page";

export default function Sheet({ section }: { section: SectionType[] }) {
  return (
    <div className="w-full pt-4 pb-8 px-6 bg-gray-100">
      <div className="rounded-md bg-white border border-gray-300 py-4">
        <div className="flex flex-col">
          {section &&
            section.map((sec) => (
              <Section
                key={sec.id}
                id={sec.id}
                name={sec.name}
                missions={sec.missions ?? []}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
