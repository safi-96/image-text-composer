"use client";
import React from "react";
import { TextLayer } from "@/hooks/useEditorState";

interface Props {
  layer: TextLayer;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
}

export default function TextInputArea({ layer, updateLayer }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Text Content
      </label>
      <textarea
        value={layer.text}
        onChange={(e) => updateLayer(layer.id, { text: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7C4585] focus:border-transparent transition-all"
        rows={3}
        placeholder="Enter your text here..."
        style={{ fontFamily: layer.fontFamily }}
      />
    </div>
  );
}
