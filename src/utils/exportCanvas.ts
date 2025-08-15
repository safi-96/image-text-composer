
import { Stage } from "konva/lib/Stage";
import { Transformer } from "konva/lib/shapes/Transformer";

export const exportCanvas = (
  stageRef: React.RefObject<Stage | null>, // ✅ Allow null
  width: number,
  height: number
) => {
  if (!stageRef.current) return; // ✅ Guard clause so null is handled

  // Hide all transformers before export
  const transformers = stageRef.current.find<Transformer>("Transformer");
  transformers.forEach((tr) => tr.visible(false));

  // Force redraw without transformers
  stageRef.current.batchDraw();

  // Export high-quality image
  const uri = stageRef.current.toDataURL({ pixelRatio: 1, width, height });

  // Show transformers again
  transformers.forEach((tr) => tr.visible(true));
  stageRef.current.batchDraw();

  // Download image
  const link = document.createElement("a");
  link.download = "canvas.png";
  link.href = uri;
  link.click();
};
