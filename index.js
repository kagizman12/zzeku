const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "Sen Zeku adında üretken bir AI asistanısın. Kısa ve faydalı cevaplar ver.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply, creditsUsed: 1 });

  } catch (error) {
    console.error("OpenAI Hatası:", error);
    res.status(500).json({ error: "OpenAI bağlantı hatası." });
  }
});

app.listen(port, () => {
  console.log(`Zeku backend ${port} portunda çalışıyor 🚀`);
});
