const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const dbPath = path.join(__dirname, 'db.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Get data from db.json
app.get('/api/data', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });
    res.json(JSON.parse(data));
  });
});

// Add data to db.json (assumes data is an array)
app.post('/api/data', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });

    let json = JSON.parse(data);

    // Find max existing id (or 0 if empty)
    let maxId = json.reduce((max, item) => (item.id > max ? item.id : max), 0);

    // Create new item with new unique id
    const newItem = { id: maxId + 1, ...req.body };

    json.push(newItem);

    fs.writeFile(dbPath, JSON.stringify(json, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to write file' });
      res.status(201).json(newItem);
    });
  });
});

app.delete('/api/data/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id, 10);

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Read error:', err);
      return res.status(500).json({ error: 'Failed to read file' });
    }

    let items;
    try {
      items = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).json({ error: 'Failed to parse JSON' });
    }

    const filteredItems = items.filter(item => item.id !== idToDelete);

    if (items.length === filteredItems.length) {
      return res.status(404).json({ error: 'Item not found' });
    }

    fs.writeFile(dbPath, JSON.stringify(filteredItems, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Write error:', writeErr);
        return res.status(500).json({ error: 'Failed to write file' });
      }

      res.json({ message: `Item with id ${idToDelete} deleted.` });
    });
  });
});

// Serve React app for all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
