import { Search, Plus } from "@deemlol/next-icons";

export default function Header() {
  return (
    <div className="border-b border-gray-300 px-8 py-2 h-14">
      <div className="flex items-center justify-between">
        <div className="py-2">
          <span className="font-semibold">Competitions</span>
        </div>
        <div className="inline-flex gap-2">
          <div className="h-full inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md min-h-6">
            <span>
              <Search size={14} color="var(--color-gray-700)" />
            </span>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="placeholder-gray-400 text-xs border-none outline-none bg-transparent w-full"
            />
          </div>
          <div>
            <button
              type="button"
              className="h-full inline-flex gap-1.5 items-center bg-blue-500 rounded-md pl-3 pr-4 hover:cursor-pointer hover:bg-[oklch(0.5721_0.1895_259.27)] transition-color duration-200"
            >
              <Plus size={12} className="text-white" />
              <span className="text-sm font-medium text-white">
                Create competition
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
