"use client";
import React from "react";
import { TextLayer } from "@/hooks/useEditorState";

interface LayerCardProps {
  layer: TextLayer;
  isSelected: boolean;
  setSelectedId: (id: string | null) => void;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
  duplicateLayer: (id: string) => void;
}

export const LayerCard: React.FC<LayerCardProps> = ({
  layer,
  isSelected,
  setSelectedId,
  updateLayer,
  duplicateLayer,
}) => {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded shadow border cursor-pointer transition ${
        isSelected
          ? "border-purple-500 bg-purple-50"
          : "border-gray-200 bg-white"
      }`}
      onClick={() => setSelectedId(layer.id)}
    >
      <span className="font-semibold text-gray-700">
        {layer.text.slice(0, 20) || "Layer"}
      </span>
      <span
        className={`ml-2 text-lg ${
          layer.locked ? "text-red-500" : "text-green-500"
        }`}
        title={layer.locked ? "Locked" : "Unlocked"}
      >
        {layer.locked ? "🔒" : "🔓"}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          updateLayer(layer.id, { locked: !layer.locked });
        }}
        className={`ml-2 px-2 py-1 rounded text-xs ${
          layer.locked ? "bg-red-100" : "bg-green-100"
        }`}
        title={layer.locked ? "Unlock Layer" : "Lock Layer"}
      >
        {layer.locked ? "Unlock" : "Lock"}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          duplicateLayer(layer.id);
        }}
        className="ml-2 px-2 py-1 rounded text-xs bg-blue-100"
        title="Duplicate Layer"
      >
        Duplicate
      </button>
    </div>
  );
};
