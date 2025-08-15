// src/pages/api/fonts.ts
import type { NextApiRequest, NextApiResponse } from "next";

interface GoogleFontResponseItem {
  family: string;
  category: string;
  variants: string[];
}

interface ApiResponse {
  items: GoogleFontResponseItem[];
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  try {
    // Fetch only metadata (small JSON)
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_FONTS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Google Fonts API failed");
    }

    const data = await response.json();

    // Map API response to only the needed fields
    const fonts: GoogleFontResponseItem[] = (data.items || []).map(
      (font: GoogleFontResponseItem) => ({
        family: font.family,
        category: font.category,
        variants: font.variants,
      })
    );

    res.status(200).json({ items: fonts });
  } catch (error) {
    console.error("Failed to fetch fonts:", error);
    res.status(500).json({ error: "Failed to fetch fonts" });
  }
}
