"use client";
import React from "react";

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export default function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}: {Math.round(value)}{unit}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C4585]"
      />
    </div>
  );
}
