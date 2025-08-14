"use client";
import React from "react";
import { TextLayer } from "@/hooks/useEditorState";

interface LetterSpacingControlProps {
  layer: TextLayer;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
}

export const LetterSpacingControl: React.FC<LetterSpacingControlProps> = ({
  layer,
  updateLayer,
}) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium w-28">Letter Spacing</label>
      <input
        type="number"
        step="0.1"
        min={-2}         
        max={4} 
        value={layer.letterSpacing}
        onChange={(e) =>
          updateLayer(layer.id, {
            letterSpacing: parseFloat(e.target.value),
          })
        }
        className="border rounded px-2 py-1 w-20"
      />
    </div>
  );
};
