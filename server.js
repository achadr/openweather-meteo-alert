const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/weather-alerts', (req, res) => {
  const alert = req.body;

  console.log('📩 Nouvelle alerte météo reçue :');
  console.log(JSON.stringify(alert, null, 2));

  // Save the alert to a JSON file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `alert-${timestamp}.json`;

  fs.writeFileSync(filename, JSON.stringify(alert, null, 2));
  res.status(200).send('✅ Alerte reçue');
});

app.get('/', (req, res) => {
  res.send('🌍 Webhook météo Render est actif !');
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});
