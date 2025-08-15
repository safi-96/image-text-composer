"use client";
import React from "react";
import { TextLayer } from "@/hooks/useEditorState";

interface Props {
  layer: TextLayer;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
}

const icons: Record<TextLayer["align"], React.ReactNode> = {
  left: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6h18M3 12h12M3 18h18"
      />
    </svg>
  ),
  center: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6h18M6 12h12M3 18h18"
      />
    </svg>
  ),
  right: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6h18M9 12h12M3 18h18"
      />
    </svg>
  ),
};

export default function AlignmentButtons({ layer, updateLayer }: Props) {
  const alignOptions: TextLayer["align"][] = ["left", "center", "right"];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Text Alignment
      </label>
      <div className="grid grid-cols-3 gap-2">
        {alignOptions.map((align) => (
          <button
            key={align}
            onClick={() => updateLayer(layer.id, { align })}
            className={`py-2 px-3 text-sm rounded-md border transition-colors flex justify-center items-center ${
              layer.align === align
                ? "bg-[#7C4585] text-white border-[#7C4585]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {icons[align]}
          </button>
        ))}
      </div>
    </div>
  );
}
