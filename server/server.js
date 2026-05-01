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
  const { firstName, lastName } = req.body;
  const trimmedFirstName = String(firstName || '').trim();
  const trimmedLastName = String(lastName || '').trim();

  if (!trimmedFirstName || !trimmedLastName) {
    return res.status(400).json({
      success: false,
      message: 'First name and last name are required'
    });
  }

  const text = `Новый пользователь: Имя - ${trimmedFirstName}, Фамилия - ${trimmedLastName}`;

  try {
    await axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
      chat_id: process.env.CHAT_ID,
      text
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send message to Telegram' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});
// what is this 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});