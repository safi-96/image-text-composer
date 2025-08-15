"use client";
import React from "react";
import { TextLayer } from "@/hooks/useEditorState";
import { CanvasStage } from "./CanvasControls/CanvasStage";
import { LayerLists } from "./CanvasControls/LayerLists";
import type { Stage } from "konva/lib/Stage";

interface Props {
  image: HTMLImageElement | null;
  layers: TextLayer[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
  duplicateLayer: (id: string) => void;
  stageRef: React.RefObject<Stage >;
  setLayers: (layers: TextLayer[]) => void;
}

export const CanvasEditor: React.FC<Props> = ({
  image,
  layers,
  selectedId,
  setSelectedId,
  updateLayer,
  duplicateLayer,
  stageRef,
}) => {
  return (
    <div className="relative bg-gray-100 rounded-lg shadow-lg border border-gray-200 overflow-auto max-h-[80vh]">
      {/* Canvas area */}
      <div>
        {!image && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Upload a background image to get started
          </div>
        )}

        {image && (
          <CanvasStage
            image={image}
            layers={layers}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            updateLayer={updateLayer}
            stageRef={stageRef}
          />
        )}
      </div>

      {/* Layer cards below the image */}
      <LayerLists
        layers={layers}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        updateLayer={updateLayer}
        duplicateLayer={duplicateLayer}
      />
    </div>
  );
};
