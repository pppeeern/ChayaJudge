import { RotateCw } from "@deemlol/next-icons";

export default function SectionHeader({
  title,
  resetFunction,
  activeCondition,
}: {
  title: string;
  resetFunction: () => void;
  activeCondition: boolean;
}) {
  return (
    <div className="flex items-center justify-between mx-6">
      <h2 className="font-semibold">{title}</h2>
      <button
        type="button"
        onClick={resetFunction}
        className={`inline-flex items-center justify-center cursor-pointer h-6 w-6 rounded-full hover:bg-gray-100 transition-all duration-100 ease-in ${
          activeCondition ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <RotateCw size={12} color="var(--color-gray-600)" />
      </button>
    </div>
  );
}
