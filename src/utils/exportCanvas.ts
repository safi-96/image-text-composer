import { Stage } from "konva/lib/Stage";
import { Transformer } from "konva/lib/shapes/Transformer";

export const exportCanvas = (
  stageRef: React.RefObject<Stage | null>,
  width: number,
  height: number
) => {
  if (!stageRef.current) return; // Guard in case stage is null

  // Hide all transformers for clean export
  const transformers = stageRef.current.find<Transformer>("Transformer");
  transformers.forEach((tr) => tr.visible(false));

  // Force redraw without transformers
  stageRef.current.batchDraw();

  // Export the canvas as a PNG image
  const uri = stageRef.current.toDataURL({
    pixelRatio: 1, // 1:1 pixels
    width,
    height,
  });

  // Restore transformers visibility
  transformers.forEach((tr) => tr.visible(true));
  stageRef.current.batchDraw();

  // Trigger download
  const link = document.createElement("a");
  link.download = "canvas.png";
  link.href = uri;
  link.click();
};
