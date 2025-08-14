"use client";
import React from "react";
import { TextLayer } from "@/hooks/useEditorState";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface Props {
  layers: TextLayer[];
  selectedId: string | null;
  setSelectedId: (id: string) => void;
  removeLayer: (id: string) => void;
  setLayers: (layers: TextLayer[]) => void;
}

export const LayerList: React.FC<Props> = ({ layers, selectedId, setSelectedId, removeLayer, setLayers }) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updated = Array.from(layers);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setLayers(updated);
  };

  return (
    <div className="space-y-2">
      {layers.length > 0 && (
        <h3 className="text-lg font-semibold mb-2" style={{ color: '#7C4585' }}>
          Text Layers
        </h3>
      )}
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="layer-list">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="space-y-2"
            >
              {layers.map((layer, index) => (
                <Draggable key={layer.id} draggableId={layer.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`rounded-lg transition-all ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                    >
                      <div
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                          layer.id === selectedId 
                            ? 'border-purple-600 bg-purple-50' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedId(layer.id)}
                      >
                        <div className="flex items-center gap-3" {...provided.dragHandleProps}>
                          <div className="text-gray-400 hover:text-gray-600">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M8 8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </div>
                          <span className="truncate max-w-[120px]">
                            {layer.text.slice(0, 15) || "Text Layer"}
                          </span>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeLayer(layer.id);
                          }}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                          aria-label="Delete layer"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path 
                              d="M6 18L18 6M6 6L18 18" 
                              stroke="#FF0000" 
                              strokeWidth="2" 
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};