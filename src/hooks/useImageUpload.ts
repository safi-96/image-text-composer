import { useState, useEffect } from "react";

const IMAGE_KEY = "image-text-composer-image";

export function useImageUpload() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  // Load saved image on mount
  useEffect(() => {
    const savedImage = localStorage.getItem(IMAGE_KEY);
    if (savedImage) {
      const img = new window.Image();
      img.src = savedImage;
      img.onload = () => setImage(img);
    }
  }, []);

  const uploadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const img = new window.Image();
        img.src = reader.result;
        img.onload = () => setImage(img);
        localStorage.setItem(IMAGE_KEY, reader.result); // Save to localStorage
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage(null);
    localStorage.removeItem(IMAGE_KEY);
  };

  return { image, uploadImage, clearImage };
}
