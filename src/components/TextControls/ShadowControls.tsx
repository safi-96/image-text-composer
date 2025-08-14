"use client";
import React from "react";
import { TextLayer } from "@/hooks/useEditorState";

function hexToRgba(hex: string, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function rgbaToHex(rgba: string) {
  const result = rgba.match(/\d+/g);
  if (!result || result.length < 3) return "#000000";
  const r = parseInt(result[0]).toString(16).padStart(2, "0");
  const g = parseInt(result[1]).toString(16).padStart(2, "0");
  const b = parseInt(result[2]).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

interface Props {
  layer: TextLayer;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
}

export default function ShadowControls({ layer, updateLayer }: Props) {
  return (
    <div className="space-y-3 border-t pt-4 mt-4">
      {/* Shadow Color */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Text Shadow Color
        </label>
        <input
          type="color"
          value={layer.shadowColor ? rgbaToHex(layer.shadowColor) : "#000000"}
          onChange={(e) =>
            updateLayer(layer.id, { shadowColor: hexToRgba(e.target.value, 0.5) })
          }
          className="w-8 h-8 border border-gray-300 rounded-md cursor-pointer"
        />
      </div>

      {/* Shadow Blur */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shadow Blur: {layer.shadowBlur || 0}
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={layer.shadowBlur || 0}
          onChange={(e) =>
            updateLayer(layer.id, { shadowBlur: Number(e.target.value) })
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C4585]"
        />
      </div>

      {/* Shadow Offset X */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shadow Offset X: {layer.shadowOffsetX || 0}
        </label>
        <input
          type="number"
          min={-40}
          max={100}
          value={layer.shadowOffsetX || 0}
          onChange={(e) =>
            updateLayer(layer.id, { shadowOffsetX: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7C4585] focus:border-transparent transition-all"
        />
      </div>

      {/* Shadow Offset Y */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shadow Offset Y: {layer.shadowOffsetY || 0}
        </label>
        <input
          type="number"
          min={-40}
          max={100}
          value={layer.shadowOffsetY || 0}
          onChange={(e) =>
            updateLayer(layer.id, { shadowOffsetY: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7C4585] focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
}
