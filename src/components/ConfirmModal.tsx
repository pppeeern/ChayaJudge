"use client";
import { createPortal } from "react-dom";

import { Divider } from "./Divider";
import { X } from "@deemlol/next-icons";
import { useEffect, useState } from "react";

export default function ConfirmModal({
  title,
  message,
  confirmText,
  confirmStyle,
  onConfirm,
  onCancel,
}: {
  title: string;
  message?: any;
  confirmText: string;
  confirmStyle: "danger" | "primary";
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
  if (typeof window == "undefined") return;

  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);

  const buttonDefault =
    "inline-flex items-center justify-center py-2 rounded-md font-medium text-gray-700 cursor-pointer transitions-color duration-100";

  return createPortal(
    <div
      onClick={onCancel}
      className={`fixed inset-0 z-50 w-screen h-screen flex items-center justify-center transition-all duration-100 ${
        open
          ? "bg-black/40 backdrop-blur-xs opacity-100"
          : "backdrop-blur-md opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-col justify-center bg-white rounded-lg max-w-2xl pt-6 pb-5 transition-all duration-150 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-16 scale-75 opacity-0"
        }`}
      >
        <button
          onClick={onCancel}
          className="absolute p-1 cursor-pointer top-3 right-4 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          <X size={14} />
        </button>
        <h1 className="px-5 text-lg text-center font-semibold">{title}</h1>
        {message && (
          <p className="px-5 pt-2 pb-4 text-center text-sm text-gray-600">
            {message}
          </p>
        )}
        <Divider />
        <div className="w-full grid grid-cols-2 gap-2 px-5 pt-3">
          <button
            onClick={onCancel}
            className={`border border-gray-300 bg-white hover:bg-gray-100 ${buttonDefault}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`${buttonDefault} text-white ${
              confirmStyle == "danger"
                ? "bg-red-500 hover:bg-red-600"
                : confirmStyle == "primary"
                ? "bg-blue-500 hover:bg-[oklch(0.5721_0.1895_259.27)]"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
