export const exportCanvas = (stageRef: any, width: number, height: number) => {
  if (!stageRef.current) return;

  // Hide all transformers before export
  const transformers = stageRef.current.find("Transformer");
  transformers.forEach((tr: any) => tr.visible(false));

  // Force redraw without transformers
  stageRef.current.batchDraw();

  // Export high-quality image
  const uri = stageRef.current.toDataURL({ pixelRatio: 1, width, height });

  // Show transformers again
  transformers.forEach((tr: any) => tr.visible(true));
  stageRef.current.batchDraw();

  // Download image
  const link = document.createElement("a");
  link.download = "canvas.png";
  link.href = uri;
  link.click();
};

