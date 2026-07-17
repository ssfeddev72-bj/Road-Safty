import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for campaign generation using Gemini API
  app.post("/api/generate-campaign", async (req: any, res: any) => {
    try {
      const { topic, platform, tone, extraPrompt } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured in the secrets panel. Please add it to Settings -> Secrets." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      let topicInstructions = "";
      if (topic === "lane_discipline") {
        topicInstructions = "Keep Left lane discipline: Slow vehicles (cars, buses, scooters, bikes) MUST drive on the left-hand side of the road in Nepal, leaving the middle/right lane completely clear for overtaking. Emphasize that the middle overtaking lane is a passing-only lane, not a cruising lane.";
      } else if (topic === "speed_limits") {
        topicInstructions = "Strict speed limits in Nepal: 30-40 km/h in residential or busy urban areas, 50 km/h on major city roads (like Kathmandu Ring Road), and 60-80 km/h on open highways (like Prithvi Highway or Terai). Drive according to road signs.";
      } else if (topic === "helmet_seatbelt") {
        topicInstructions = "Mandatory safety gear in Nepal: Motorcycle/scooter riders (both driver and pillion where applicable, though rule focuses on driver) must wear a helmet securely, and car drivers and front seat passengers must wear a seatbelt.";
      } else if (topic === "license_bluebook") {
        topicInstructions = "Required documents: Drivers in Nepal must always carry their original, valid Driving License and the vehicle's registration booklet (known locally as the Blue Book or 'Billa Book').";
      } else {
        topicInstructions = "General road safety in Nepal: Obey traffic lights, listen to traffic police instructions, give way to pedestrians at zebra crossings, avoid phone usage unless hands-free, and absolutely never drive under the influence of alcohol/drugs (MaPaSe).";
      }

      const prompt = `Create a professional and highly engaging social media awareness campaign for road safety rules in Nepal.
Focus Area: ${topicInstructions}
Target Platform: ${platform || 'Instagram'}
Tone of Voice: ${tone || 'informative'}
Additional User Context/Instruction: ${extraPrompt || 'None'}

Please provide:
1. Three (3) highly creative and catchy slogans tailored for Nepalese roads, riders, and drivers. Incorporate common local terms when applicable (like 'Blue Book', 'MaPaSe', 'Ring Road', 'Zebra Crossing').
2. An engaging, ready-to-copy social media caption formatted with generous line breaks, clear bullets/emojis, and 6-8 relevant hashtags (such as #KeepLeftNepal #BlueBookCheck #ZeroMaPaSe #NepalTrafficPolice #RoadSafetyNepal).
3. Design or graphic layout advice describing how to visually show this message on a campaign poster.

Ensure the output is relatable, helpful, and highly polished. Do not use generic answers; make them very specific to Nepal's driving environment.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              slogans: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Three highly creative slogans relevant to Nepal and the topic."
              },
              caption: {
                type: Type.STRING,
                description: "An engaging social media post caption with emojis, spaces, and relevant hashtags."
              },
              graphicAdvice: {
                type: Type.STRING,
                description: "A professional description of the poster's visual components and layout recommendation."
              }
            },
            required: ["slogans", "caption", "graphicAdvice"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from Gemini.");
      }

      const data = JSON.parse(responseText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      res.status(500).json({ 
        error: error.message || "Failed to generate campaign content from Gemini AI." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: any, res: any) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
