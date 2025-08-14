import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export interface TextLayer {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  fill: string;
  opacity: number;
  align: "left" | "center" | "right";
  x: number;
  y: number;
  rotation: number;
  width?: number; 
  height?: number;
  locked?: boolean; 
  shadowColor?: string;      
  shadowBlur?: number;        
  shadowOffsetX?: number;     
  shadowOffsetY?: number;   
  lineHeight: number;     
  letterSpacing: number;  
}

// New type for descriptive history
export interface HistoryEntry {
  layers: TextLayer[];
  description: string;
}

const LOCAL_STORAGE_KEY = "image-text-composer";

export function useEditorState() {
  const [layers, setLayers] = useState<TextLayer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setLayers(parsed.layers || []);
      setImageSrc(parsed.imageSrc || null);

      if (parsed.layers?.length) {
        setHistory([{ layers: parsed.layers, description: "Initial state" }]);
        setHistoryIndex(0);
      }
    }
  }, []);

  // Autosave layers + image
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ layers, imageSrc })
    );
  }, [layers, imageSrc]);

  // Push history with description
  const pushHistory = useCallback(
  (newLayers: TextLayer[], description: string) => {
    const newHistory = [...history.slice(0, historyIndex + 1), { layers: newLayers, description }];
    setHistory(newHistory);
    setHistoryIndex(historyIndex + 1);
  },
  [history, historyIndex]
);


  const addLayer = useCallback(() => {
    const newLayer: TextLayer = {
      id: uuidv4(),
      text: "New Text",
      fontFamily: "Roboto",
      fontSize: 40,
      fontWeight: "normal",
      fill: "#000000",
      opacity: 1,
      align: "center",
      x: 100,
      y: 100,
      rotation: 0,
      locked: false, 
      lineHeight: 1,     
      letterSpacing: 0,
    };
    const updated = [newLayer,...layers];
    setLayers(updated);
    setSelectedId(newLayer.id);
    pushHistory(updated, `Added layer "${newLayer.text}"`);
  }, [layers, pushHistory]);

  const updateLayer = useCallback(
    (id: string, updates: Partial<TextLayer>) => {
      const updated = layers.map(l => (l.id === id ? { ...l, ...updates } : l));
      setLayers(updated);
      pushHistory(updated, `Updated layer "${id}"`);
    },
    [layers, pushHistory]
  );

  const removeLayer = useCallback(
    (id: string) => {
      const updated = layers.filter(l => l.id !== id);
      setLayers(updated);
      setSelectedId(null);
      pushHistory(updated, `Removed layer "${id}"`);
    },
    [layers, pushHistory]
  );

  const reorderLayers = useCallback(
    (newOrder: TextLayer[]) => {
      setLayers(newOrder);
      pushHistory(newOrder, "Reordered layers");
    },
    [pushHistory]
  );

  const moveLayerForward = useCallback(() => {
    if (!selectedId) return;
    const index = layers.findIndex(l => l.id === selectedId);
    if (index === -1 || index === layers.length - 1) return;
    const newLayers = [...layers];
    [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
    setLayers(newLayers);
    pushHistory(newLayers, `Moved layer "${selectedId}" forward`);
  }, [layers, selectedId, pushHistory]);

  const moveLayerBackward = useCallback(() => {
    if (!selectedId) return;
    const index = layers.findIndex(l => l.id === selectedId);
    if (index <= 0) return;
    const newLayers = [...layers];
    [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
    setLayers(newLayers);
    pushHistory(newLayers, `Moved layer "${selectedId}" backward`);
  }, [layers, selectedId, pushHistory]);

  const duplicateLayer = useCallback((id: string) => {
    const layer = layers.find(l => l.id === id);
    if (!layer) return;
    const newLayer = {
      ...layer,
      id: uuidv4(),
      x: layer.x + 30,
      y: layer.y + 30,
      locked: false, 
    };
    const updated = [...layers, newLayer];
    setLayers(updated);
    pushHistory(updated, `Duplicated layer "${layer.text}"`);
  }, [layers, pushHistory]);

  const setImageFromFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const reset = useCallback(() => {
    setLayers([]);
    setSelectedId(null);
    setHistory([]);
    setHistoryIndex(-1);
    setImageSrc(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setLayers(history[newIndex].layers);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setLayers(history[newIndex].layers);
    }
  }, [history, historyIndex]);

  return {
    layers,
    selectedId,
    setSelectedId,
    addLayer,
    updateLayer,
    removeLayer,
    reorderLayers,
    moveLayerForward,
    moveLayerBackward,
    undo,
    redo,
    reset,
    setImageFromFile,
    imageSrc, 
    duplicateLayer,
    history,
    historyIndex,
    setLayers, 
  };
}
