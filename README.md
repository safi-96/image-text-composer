
## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install

then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🖌 Image Text Editor

An image text editing tool that allows users to upload images, add multiple styled text layers, arrange them in a layer list, and export the final composition. Built with a modular React architecture for flexibility and maintainability.

## 📐 Architecture Overview

## React (Client-Side Rendering)

CanvasStage – renders the image and text layers using Konva for interactive transformations.

LayerControls – sidebar to manage font styles, positioning, and layer order.

LayerList – draggable list for reordering layers with @hello-pangea/dnd.

## State is managed using a custom hook (useEditorState) that handles:

Layers array with metadata (id, text, position, style, lock/visibility flags).

Undo/Redo stacks for history tracking.

Selected layer tracking.

Google Fonts API integration for dynamic font loading.

## Konva + React Konva
Used for rendering text and image on a performant HTML5 Canvas with drag/resize/rotate capabilities.

## Undo/Redo System
Implemented via two stacks (undoStack & redoStack) storing layer state snapshots.

## LocalStorage Persistence
Saves uploaded images and layer data for session continuity.

## ⚙️ Technology Choices & Trade-offs

## React	
Component-based architecture, reusable UI parts	
Trade-off: Larger bundle size compared to vanilla JS

## React Konva	
High-performance canvas rendering & transformations
Trade-off: Less direct control than pure Canvas API

## Google Fonts API	
Huge font library, easy integration	

## @hello-pangea/dnd	
Smooth drag-and-drop for reordering layers	
Trade-off: Slight performance overhead on very large lists

## Custom Hooks	
Clean separation of editor logic	

## 🌟 Bonus Points Implemented

1. Ability to edit line-height, letter-spacing
2. Lock / unlock layers, duplicate layers
3. Text shadow (customizable color, blur, and offset)

I wanted to implement all the bonus features, but decided to deliver early so as to not miss the opportunity of working on the next round.  I have ensured that the core features are completed and stable. We can always implement other bonus points later. 

## 🚧 Known Limitations

No server-side storage – all data is client-only.

No multi-select editing – can only modify one layer at a time.

Google Fonts API dependency – fonts won’t load offline.
