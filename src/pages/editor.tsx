"use client";
import React, { useRef, useState} from "react";
import { CanvasEditor } from "@/components/CanvasEditor";
import { LayerList } from "@/components/LayerList";
import TextLayerControls from "@/components/TextLayerControls";
import { Toolbar } from "@/components/Toolbar";
import { useEditorState } from "@/hooks/useEditorState";
import { useImageUpload } from "@/hooks/useImageUpload";
import { exportCanvas } from "@/utils/exportCanvas";
import { HistoryModal } from "@/components/ToolbarControls/HistoryModal";
import type { Stage } from "konva/lib/Stage";


export default function EditorPage() {
  const stageRef = useRef<Stage>(null!);
  const [showHistory, setShowHistory] = useState(false);
  
  const goToHistoryStep = (index: number) => {
  setLayers(history[index].layers);
  
};

  const { image, uploadImage, clearImage } = useImageUpload();
  const {
    layers,
    selectedId,
    setSelectedId,
    setLayers,
    addLayer,
    updateLayer,
    removeLayer,
    undo,
    redo,
    reset,
    moveLayerForward,
    moveLayerBackward,
    duplicateLayer,
    history,
    historyIndex,
  } = useEditorState();
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const selectedLayer = layers.find((l) => l.id === selectedId);
  
  return (
    <div>
      <Toolbar
        onUpload={uploadImage}
        onAddText={addLayer}
        onUndo={undo}
        onRedo={redo}
        onExport={() =>
          exportCanvas(stageRef, image?.width || 800, image?.height || 600)
        }
        onReset={() => {
          reset(); // clears layers
          clearImage(); // clears image
        }}
        hasImage={!!image}
        onShowHistory={() => setShowHistory(true)} 
        canUndo={canUndo} 
        canRedo={canRedo} 
      />
      {showHistory && (
  <HistoryModal
   history={[...history].slice(0, historyIndex + 1).reverse()} // newest first
  historyIndex={0} 
    onClose={() => setShowHistory(false)}
    onSelectStep={(index) => {
      goToHistoryStep(index);
      setShowHistory(false); // close modal after selecting
    }}
  />
)}

      
      <div className="flex">
        <div className="flex-1 mt-3 ml-10">
          <CanvasEditor
            image={image}
            layers={layers}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            updateLayer={updateLayer}
            stageRef={stageRef}
            duplicateLayer={duplicateLayer} 
            setLayers={setLayers}
          />
        </div>
        <div className="w-64 p-2 space-y-4">
          <LayerList
            setLayers={setLayers}
            layers={layers}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            removeLayer={removeLayer}
          />
          {selectedLayer && (
            <div className="max-h-[70vh] overflow-y-auto">
              <TextLayerControls
                layer={selectedLayer}
                updateLayer={updateLayer}
                moveLayerForward={moveLayerForward}
                moveLayerBackward={moveLayerBackward}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
