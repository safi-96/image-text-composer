"use client";
import React from "react";
import { TextLayer } from "@/hooks/useEditorState";
import TextInputArea from "./TextControls/TextInputArea";
import FontFamilySelect from "./TextControls/FontFamilySelect";
import ColorPicker from "./TextControls/ColorPicker";
import SliderControl from "./TextControls/SliderControl";
import AlignmentButtons from "./TextControls/AlignmentButtons";
import ShadowControls from "./TextControls/ShadowControls";
import { LetterSpacingControl } from "@/components/TextControls/LetterSpacingControl";
import { LineHeightControl } from "@/components/TextControls/LineHeightControl";


interface Props {
  layer: TextLayer;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
  moveLayerForward: () => void;
  moveLayerBackward: () => void;
}

export default function TextLayerControls({
  layer,
  updateLayer,
  moveLayerForward,
  moveLayerBackward,
}: Props) {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <TextInputArea layer={layer} updateLayer={updateLayer} />
      <FontFamilySelect layer={layer} updateLayer={updateLayer} />
      <ColorPicker
        label="Text Color"
        value={layer.fill}
        onChange={(color) => updateLayer(layer.id, { fill: color })}
      />
      <SliderControl
        label="Font Size"
        value={layer.fontSize}
        min={4}
        max={100}
        unit="px"
        onChange={(v) => updateLayer(layer.id, { fontSize: v })}
      />
      <AlignmentButtons layer={layer} updateLayer={updateLayer} />
      <SliderControl
        label="Opacity"
        value={layer.opacity * 100}
        min={0}
        max={100}
        step={5} 
        unit="%"
        onChange={(v) => updateLayer(layer.id, { opacity: v / 100 })} 
      />
      <ShadowControls layer={layer} updateLayer={updateLayer} />
      <LineHeightControl layer={layer} updateLayer={updateLayer} />
      <LetterSpacingControl layer={layer} updateLayer={updateLayer} />
     
    </div>
  );
}
