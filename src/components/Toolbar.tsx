"use client";
import React from "react";

interface Props {
  onUpload: (file: File) => void;
  onAddText: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
  onReset: () => void;
  hasImage: boolean;
  onShowHistory?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const Toolbar: React.FC<Props> = ({
  onUpload,
  onAddText,
  onUndo,
  onRedo,
  onExport,
  onReset,
  hasImage,
  onShowHistory,
  canUndo,
  canRedo,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-5 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Primary Actions */}
      <div className="flex items-center gap-3">
        {/* File Upload Button */}
        <label className="relative cursor-pointer group">
          <input
            type="file"
            accept="image/png"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
          />
          <span className="flex items-center gap-2 px-5 py-3 bg-[#7C4585] text-white rounded-lg hover:bg-[#6a3a75] transition-all transform hover:scale-105 active:scale-95 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Upload
          </span>
        </label>

        {/* Add Text Button */}
        <button
          onClick={onAddText}
          disabled={!hasImage} // <-- Disable if no image
          className={`cursor-pointer flex items-center gap-2 px-5 py-3 bg-[#FFA725] text-white rounded-lg hover:bg-[#e69520] transition-all transform hover:scale-105 active:scale-95 shadow-md ${!hasImage ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Text
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center gap-3">
        {/* Undo/Redo Buttons */}
        <div className="flex gap-2 bg-gray-50 p-1 rounded-lg">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`cursor-pointer flex items-center justify-center p-2 bg-white text-[#7C4585] rounded-md hover:bg-[#f5e5f7] transition-colors shadow-sm border border-gray-200 ${!canUndo ? "opacity-50 cursor-not-allowed" : ""
              }`}
            title="Undo"
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8.272l2.636-2.636M3 8.272l2.636 2.636M3 8.272h10a6 6 0 016 6v1"
              />
            </svg>
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`cursor-pointer flex items-center justify-center p-2 bg-white text-[#7C4585] rounded-md hover:bg-[#f5e5f7] transition-colors shadow-sm border border-gray-200 ${!canRedo ? "opacity-50 cursor-not-allowed" : ""
              }`}
            title="Redo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636L21 8.272m0 0l-2.636 2.636M21 8.272H11a6 6 0 00-6 6v1"
              />
            </svg>
          </button>
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className=" cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#7C4585] to-[#9A5FA5] text-white rounded-lg hover:opacity-90 transition-all shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export
        </button>
      </div>
      {onShowHistory && (
        <button
          onClick={onShowHistory}
          className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#7C4585] to-[#9A5FA5] text-white rounded-lg hover:opacity-90 transition-all shadow-md"
        >
          History
        </button>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="cursor-pointer flex items-center gap-2 px-4 py-2.5 ml-auto bg-white text-red-600 rounded-lg border border-red-200 hover:bg-red-50 transition-colors shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Reset
      </button>
    </div>
  );
};
