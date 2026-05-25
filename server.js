require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generate-caption", async (req, res) => {
  const { productName, features, audience, platform } = req.body;

  try {
    // FIX: Using an active, current model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Create 3 catchy ${platform} ad captions for a product named ${productName}. 
        Target audience: ${audience}. Key features: ${features}. 
        Keep it engaging, include a call to action, and use relevant emojis.`;

    const result = await model.generateContent(prompt);
    res.json({ caption: result.response.text() });
  } catch (error) {
    console.error("Gemini API Error Details:", error);
    res.status(500).json({
      error: "Failed to generate caption",
      details: error.message,
    });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
