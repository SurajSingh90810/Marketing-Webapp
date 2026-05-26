require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(
  cors({
    origin: "https://marketing-webapp-taupe.vercel.app",
    methods: ["GET", "POST"],
  }),
);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/generate-caption", async (req, res) => {
  try {
    const { productName, features, audience, platform } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `Create 3 catchy ${platform} ad captions for a product named ${productName}.

        Target audience: ${audience}. Key features: ${features}.

        Keep it engaging, include a call to action, and use relevant emojis.`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.json({
      caption: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
