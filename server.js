const express = require('express');
const path = require('path');
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

// ✅ Moved above app.listen
app.get('/alerts/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, filename);

  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).send('❌ Fichier non trouvé');
  }
});
app.get('/alerts', (req, res) => {
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      return res.status(500).send('❌ Erreur de lecture des fichiers');
    }

    const alertFiles = files.filter(file => file.startsWith('alert-') && file.endsWith('.json'));
    res.json(alertFiles);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});
