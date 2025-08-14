"use client";
import React from "react";
import { TextLayer } from "@/hooks/useEditorState";

interface LineHeightControlProps {
  layer: TextLayer;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
}

export const LineHeightControl: React.FC<LineHeightControlProps> = ({
  layer,
  updateLayer,
}) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium w-28">Line Height</label>
      <input
        type="number"
        step="0.1"
        min={-2}         
        max={4}  
        value={layer.lineHeight}
        onChange={(e) =>
          updateLayer(layer.id, {
            lineHeight: parseFloat(e.target.value),
          })
        }
        className="border rounded px-2 py-1 w-20"
      />
    </div>
  );
};
