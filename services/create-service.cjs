const express = require('express');
const cors = require('cors');

function createService({ name, port, route, data = [] }) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ service: name, status: 'ok', port }));
  app.get(`/api/${route}`, (req, res) => res.json(data));
  app.post(`/api/${route}`, (req, res) => {
    const record = { id: `${route}-${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
    data.push(record);
    res.status(201).json(record);
  });

  app.listen(port, () => console.log(`${name} listening on http://localhost:${port}`));
}

module.exports = { createService };
