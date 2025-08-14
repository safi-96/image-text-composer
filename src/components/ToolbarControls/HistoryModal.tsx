"use client";
import React from "react";
import { HistoryEntry } from "@/hooks/useEditorState";

interface Props {
  history: HistoryEntry[];
  historyIndex: number;
  onClose: () => void;
  onSelectStep: (index: number) => void;
}

export const HistoryModal: React.FC<Props> = ({ history, historyIndex, onClose, onSelectStep }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div 
        className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-2xl z-10 max-h-[90vh] flex flex-col border"
        style={{ borderColor: '#7C4585' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-2xl font-bold"
            style={{ color: '#7C4585' }}
          >
            Undo/Redo History
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-2xl font-light"
            aria-label="Close"
            style={{ color: '#7C4585' }}
          >
            &times;
          </button>
        </div>

        {/* History list */}
        <div className="flex-1 overflow-y-auto pr-2">
          <ul className="space-y-3">
            {history.map((entry, index) => (
              <li key={index}>
                <button
                  onClick={() => onSelectStep(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    index === historyIndex
                      ? "border-l-4"
                      : "hover:bg-gray-50"
                  }`}
                  style={{
                    backgroundColor: index === historyIndex ? 'rgba(124, 69, 133, 0.12)' : 'transparent',
                    borderColor: '#7C4585'
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
                      style={{
                        backgroundColor: index === historyIndex ? '#FFA725' : "#D1D5DB"
                      }}
                    />
                    <div>
                      <p
                        className="font-medium"
                        style={{
                          color: index === historyIndex ? '#7C4585' : "#111827"
                        }}
                      >
                        {entry.description}
                      </p>
                      
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium rounded-lg transition-colors hover:opacity-90"
            style={{
              backgroundColor: '#FFA725',
              color: 'white'
            }}
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};