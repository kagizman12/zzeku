const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
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

    const reply = completion.data.choices[0].message.content;
    res.json({ reply, creditsUsed: 1 });

  } catch (error) {
    console.error("OpenAI Hatası:", error.response?.data || error.message);
    res.status(500).json({ error: "OpenAI bağlantı hatası." });
  }
});

app.listen(port, () => {
  console.log(`Zeku backend ${port} portunda çalışıyor 🚀`);
});
