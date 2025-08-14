"use client";
import React from "react";
import { TextLayer } from "@/hooks/useEditorState";
import { LayerCard } from "./LayerCards";

interface LayerListProps {
  layers: TextLayer[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
  duplicateLayer: (id: string) => void;
}

export const LayerLists: React.FC<LayerListProps> = ({
  layers,
  selectedId,
  setSelectedId,
  updateLayer,
  duplicateLayer,
}) => {
  if (layers.length === 0) return null;

  return (
    <div className="w-full flex flex-wrap gap-3 justify-center mt-4 mb-4">
      {layers.map((layer) => (
        <LayerCard
          key={layer.id}
          layer={layer}
          isSelected={selectedId === layer.id}
          setSelectedId={setSelectedId}
          updateLayer={updateLayer}
          duplicateLayer={duplicateLayer}
        />
      ))}
    </div>
  );
};
