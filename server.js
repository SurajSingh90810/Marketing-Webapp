require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// UPDATE: Configure CORS to specifically allow your Vercel app and local dev
app.use(
  cors({
    origin: [
      "https://marketing-webapp-taupe.vercel.app", // Your deployed frontend
      "http://localhost:5173", // Optional: Keep this if you still want to test locally (assuming Vite defaults to 5173)
      "http://localhost:3000", // Optional: Keep this if you use Create React App locally
    ],
  }),
);

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

// Using process.env.PORT is important for deployment platforms like Render or Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
