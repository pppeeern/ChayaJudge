"use client";
import { useState } from "react";

import { Filter, List, Grid } from "@deemlol/next-icons";

export default function ConfigBar({
  compLength,
}: {
  compLength: number | undefined;
}) {
  const [view, setView] = useState("grid");

  return (
    <div className="flex items-center justify-between mx-10 pb-4 border-b border-b-gray-200">
      <div className="flex items-center gap-2">
        <p className="text-sm rounded-md px-2 py-1 bg-gray-50 text-gray-500">
          All:{" "}
          <span className="text-sm text-gray-600 font-medium">
            {compLength}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setView("grid")}
            className={`cursor-pointer inline-flex items-center justify-center gap-2 text-sm rounded-md h-6 w-6 aspect-square ${
              view == "grid"
                ? "text-gray-700 bg-gray-100"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Grid size={12} className="translate-y-[1px]" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`cursor-pointer inline-flex items-center justify-center gap-2 text-sm rounded-md h-6 w-6 aspect-square ${
              view == "list"
                ? "text-gray-700 bg-gray-100"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <List size={12} className="translate-y-[1px]" />
          </button>
        </div>
        <button className="cursor-pointer inline-flex items-center gap-2 text-sm rounded-md px-3 py-1 font-medium text-gray-600 bg-white border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-100">
          <Filter size={12} className="text-blue-500 translate-y-[1px]" />
          Filter
        </button>
        <button className="cursor-pointer inline-flex items-center gap-2 text-sm rounded-md px-3 py-1 font-medium text-gray-600 bg-white border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-100">
          <List size={12} className="text-blue-500 translate-y-[1px]" />
          Sort
        </button>
      </div>
    </div>
  );
}
