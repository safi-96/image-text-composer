"use client";
import React, { useRef, useEffect, useMemo } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text as KonvaText,
  Transformer,
} from "react-konva";
import { TextLayer } from "@/hooks/useEditorState";

interface CanvasStageProps {
  image: HTMLImageElement | null;
  layers: TextLayer[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
  stageRef: React.RefObject<any>;
}

export const CanvasStage: React.FC<CanvasStageProps> = ({
  image,
  layers,
  selectedId,
  setSelectedId,
  updateLayer,
  stageRef,
}) => {
  const trRef = useRef<any>(null);

  // Calculate scale to fit image within 80% viewport height
  const { scale, stageWidth, stageHeight } = useMemo(() => {
    if (!image) return { scale: 1, stageWidth: 0, stageHeight: 0 };

    const maxHeight = window.innerHeight * 0.8;
    const scale = image.height > maxHeight ? maxHeight / image.height : 1;

    return {
      scale,
      stageWidth: image.width * scale,
      stageHeight: image.height * scale,
    };
  }, [image]);

  // Update Transformer nodes when selection or layers change
  useEffect(() => {
    if (!trRef.current || !selectedId) {
      trRef.current?.nodes([]);
      trRef.current?.getLayer()?.batchDraw();
      return;
    }
    const node = stageRef.current?.findOne(`#${selectedId}`);
    if (node) {
      trRef.current.nodes([node]);
      trRef.current.getLayer()?.batchDraw();
    } else {
      trRef.current?.nodes([]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [selectedId, layers, stageRef]);

  const handleDragEnd = (e: any) => {
    const id = e.target.id();
    const node = e.target;

    updateLayer(id, {
      x: node.x() / scale,
      y: node.y() / scale,
    });
  };

  const handleTransformEnd = (e: any) => {
    const id = e.target.id();
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newWidth = (node.width() * scaleX) / scale;
    const newFontSize = (node.fontSize() * scaleY) / scale;

    updateLayer(id, {
      x: node.x() / scale,
      y: node.y() / scale,
      rotation: node.rotation(),
      width: newWidth,
      fontSize: newFontSize,
    });

    node.scaleX(1);
    node.scaleY(1);
  };

  if (!image) return null;

  return (
    <Stage
      ref={stageRef}
      width={stageWidth}
      height={stageHeight}
      onMouseDown={(e) => {
        if (e.target === e.target.getStage()) {
          setSelectedId(null); // deselect any text
        }
      }}
    >
      <Layer>
        {/* Image */}
        <KonvaImage
          image={image}
          width={stageWidth}
          height={stageHeight}
          listening={false}
        />

        {/* Text layers (newest on top) */}
        {[...layers].slice().reverse().map((layer) => {
          if (!layer.text || layer.text.trim() === "") return null;

          const isSelected = selectedId === layer.id;

          const shadowProps = layer.shadowColor
            ? {
                shadowColor: layer.shadowColor,
                shadowBlur: layer.shadowBlur || 0,
                shadowOffset: {
                  x: layer.shadowOffsetX || 0,
                  y: layer.shadowOffsetY || 0,
                },
                shadowOpacity: 1,
              }
            : isSelected
            ? {
                shadowColor: "rgba(0,0,0,0.2)",
                shadowBlur: 10,
                shadowOffset: { x: 0, y: 0 },
                shadowOpacity: 1,
              }
            : {
                shadowColor: "transparent",
                shadowBlur: 0,
                shadowOffset: { x: 0, y: 0 },
                shadowOpacity: 0,
              };

          return (
            <KonvaText
              key={layer.id}
              id={layer.id}
              text={layer.text}
              x={layer.x * scale}
              y={layer.y * scale}
              width={(layer.width || 200) * scale}
              fontSize={layer.fontSize * scale}
              fontFamily={layer.fontFamily}
              fontStyle={layer.fontWeight}
              fill={layer.fill}
              opacity={layer.opacity}
              align={layer.align}
              wrap="word"
              draggable={!layer.locked}
              rotation={layer.rotation}
              onClick={() => !layer.locked && setSelectedId(layer.id)}
              onTap={() => !layer.locked && setSelectedId(layer.id)}
              onDragEnd={handleDragEnd}
              onTransformEnd={handleTransformEnd}
              lineHeight={layer.lineHeight}
              letterSpacing={layer.letterSpacing}
              listening={!layer.locked}
              {...shadowProps}
            />
          );
        })}

        {/* Transformer for selected text */}
        {selectedId && (
          <Transformer
            ref={trRef}
            rotateEnabled={true}
            borderStroke="#7C4585"
            anchorStroke="#7C4585"
          />
        )}
      </Layer>
    </Stage>
  );
};
