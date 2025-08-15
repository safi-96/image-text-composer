"use client";
import React, { useEffect, useState } from "react";
import { TextLayer } from "@/hooks/useEditorState";

interface GoogleFont {
  family: string;
  category: string;
  variants: string[];
}

interface Props {
  layer: TextLayer;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
}


function loadGoogleFont(font: string) {
  const id = "google-font-" + font.replace(/\s+/g, "-");
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}&display=swap`;
    document.head.appendChild(link);
  }
}

export default function FontFamilySelect({ layer, updateLayer }: Props) {
  const [fonts, setFonts] = useState<GoogleFont[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/fonts")
      .then((res) => res.json())
      .then((data) => {
        setFonts(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (layer.fontFamily) {
      loadGoogleFont(layer.fontFamily);
    }
  }, [layer.fontFamily]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Font Family
      </label>
      {loading ? (
        <div>Loading fonts...</div>
      ) : (
        <select
          value={layer.fontFamily}
          onChange={(e) =>
            updateLayer(layer.id, { fontFamily: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7C4585] focus:border-transparent transition-all"
          style={{ fontFamily: layer.fontFamily }}
        >
          {fonts.map((font) => (
            <option
              key={font.family}
              value={font.family}
              style={{ fontFamily: font.family }}
            >
              {font.family}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
