// api/ask.js
// Серверна функція Vercel — виконується ТІЛЬКИ на сервері.
// Адреса Make-вебхука ніколи не потрапляє в код, який бачить браузер.
// Реальне значення MAKE_WEBHOOK_URL задається в Vercel:
// Settings → Environment Variables (не тут, не в GitHub).

module.exports = async (req, res) => {
  // Дозволяємо лише POST-запити
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { messages } = req.body || {};

  // messages — масив повідомлень розмови: [{ role: 'user'|'assistant', content: '...' }, ...]
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'Brak wiadomości' });
    return;
  }

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || !lastMessage.content || !String(lastMessage.content).trim()) {
    res.status(400).json({ error: 'Puste pytanie' });
    return;
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    // Змінна середовища не налаштована на Vercel
    console.error('MAKE_WEBHOOK_URL is not set in environment variables');
    res.status(500).json({ error: 'Serwer nie jest poprawnie skonfigurowany' });
    return;
  }

  try {
    const makeResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Передаємо всю історію розмови, щоб Make/AI міг враховувати контекст
      body: JSON.stringify({ messages }),
    });

    if (!makeResponse.ok) {
      throw new Error(`Make webhook responded with status ${makeResponse.status}`);
    }

    const data = await makeResponse.json();

    // Очікуємо, що Make поверне { answer: "..." }
    res.status(200).json({ answer: data.answer || 'Brak odpowiedzi z serwera.' });
  } catch (err) {
    console.error('Ask API error:', err);
    res.status(500).json({ error: 'Błąd podczas przetwarzania zapytania. Spróbuj ponownie.' });
  }
};
