
import type { Stage } from "konva/lib/Stage";
import type { Transformer } from "konva/lib/shapes/Transformer";

export function exportCanvas(stageRef: React.RefObject<Stage | null>, image: HTMLImageElement | null) {
  if (!stageRef.current || !image) return;

  // Hide transformers for a clean export
  const transformers = stageRef.current.find<Transformer>("Transformer");
  transformers.forEach(tr => tr.visible(false));
  stageRef.current.batchDraw();

  // Export at the image's native resolution
  const uri = stageRef.current.toDataURL({
    pixelRatio: 1, 
    width: image.width,
    height: image.height,
  });

  // Restore transformers
  transformers.forEach(tr => tr.visible(true));
  stageRef.current.batchDraw();

  // Trigger download
  const link = document.createElement("a");
  link.download = "canvas.png";
  link.href = uri;
  link.click();
}
