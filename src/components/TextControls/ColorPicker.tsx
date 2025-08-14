"use client";
import React from "react";

interface Props {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ label, value, onChange }: Props) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 border border-gray-300 rounded-md cursor-pointer"
        />
        <span className="text-xs text-gray-500">{value}</span>
      </div>
    </div>
  );
}
