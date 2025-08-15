import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch only Google Fonts metadata (JSON), NOT font files
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_FONTS_API_KEY}`
    );
    const data = await response.json();

    // Return only font family names
    const fonts = data.items.map((font: any) => font.family);

    res.status(200).json(fonts);
  } catch (error) {
    console.error("Failed to fetch fonts:", error);
    res.status(500).json({ error: "Failed to fetch fonts" });
  }
}
