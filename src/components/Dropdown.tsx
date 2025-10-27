"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

type DropdownType = {
  className?: string;
  fullWidth?: boolean;
  inner?: React.ReactNode;
  children: React.ReactNode;
};

export function Dropdown({
  className,
  fullWidth,
  inner,
  children,
}: DropdownType) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setOpen((prev) => !prev);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    const handleBlur = (e: MouseEvent) => {
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleBlur);
    return () => document.removeEventListener("mousedown", handleBlur);
  }, []);

  return (
    <div ref={dropdownRef} className={`${className} relative inline-block`}>
      <button onClick={handleClick} className="w-full outline-0">
        {inner}
      </button>

      {children && (
        <div
          onClick={() => setOpen(false)}
          className={`absolute z-10 mt-1 ${
            fullWidth ? "min-w-full" : ""
          } rounded-md border border-gray-300 bg-white shadow-md transition-all duration-[50ms] ease-in origin-top overflow-hidden pointer-events-auto ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
