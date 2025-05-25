const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
const dbPath = path.join(__dirname, "db.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

// Get data from db.json
app.get("/api/data", (req, res) => {
  const { uuid } = req.query;

  if (!uuid) {
    return res.status(400).json({ error: "UUID is required" });
  }

  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Failed to read data" });
    }

    const taskData = JSON.parse(data);

    if (!taskData[uuid]) {
      taskData[uuid] = [];
    }

    const tasks = taskData[uuid];

    if (!tasks) {
      return res.status(404).json({ error: "UUID not found" });
    }

    res.json({ uuid, tasks });
  });
});

// Add data to db.json (assumes data is an array)
app.post("/api/data", (req, res) => {
  const { uuid, value } = req.body;
  if (!uuid || !value) {
    return res.status(400).json({ error: "UUID and value are required" });
  }

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read file" });

    let json = JSON.parse(data);

    if (!json[uuid]) {
      json[uuid] = [];
    }

    // Find max existing id (or 0 if empty)
    let maxId = json[uuid].reduce(
      (max, item) => (item.id > max ? item.id : max),
      0
    );

    const newItem = {
      id: maxId + 1,
      body: value,
      isChecked: false,
    };

    json[uuid].push(newItem);

    fs.writeFile(dbPath, JSON.stringify(json, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to write file" });
      res.status(201).json(newItem);
    });
  });
});

app.put("/api/data/:id", (req, res) => {
  const idToUpdate = parseInt(req.params.id, 10);

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });

    let items = JSON.parse(data);
    const index = items.findIndex((item) => item.id === idToUpdate);

    if (index === -1) return res.status(404).json({ error: "Item not found" });

    // Replace the entire object but keep the same id
    items[index] = { id: idToUpdate, ...req.body };

    fs.writeFile(dbPath, JSON.stringify(items, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ error: "Write error" });

      res.json(items[index]);
    });
  });
});

app.delete("/api/data/:uuid/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id, 10);
  const uuid = req.params.uuid;

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error("Read error:", err);
      return res.status(500).json({ error: "Failed to read file" });
    }

    let json;
    try {
      json = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).json({ error: "Failed to parse JSON" });
    }

    if (!json[uuid]) {
      return res.status(404).json({ error: "UUID not found" });
    }
    const originalLength = json[uuid].length;
    json[uuid] = json[uuid].filter((item) => item.id !== idToDelete);

    if (originalLength === json[uuid].length) {
      return res.status(404).json({ error: "Item not found" });
    }

    fs.writeFile(dbPath, JSON.stringify(json, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Write error:", writeErr);
        return res.status(500).json({ error: "Failed to write file" });
      }

      res.json({ message: `Item with id ${idToDelete} deleted.` });
    });
  });
});

app.patch("/api/data/:uuid/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const uuid = req.params.uuid;
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });

    let json = JSON.parse(data);

    if (!json[uuid]) {
      return res.status(404).json({ error: "UUID not found" });
    }

    const index = json[uuid].findIndex((item) => item.id === id);

    if (index === -1) return res.status(404).json({ error: "Item not found" });

    // Only update the fields provided
    json[uuid][index] = { ...json[uuid][index], ...req.body };

    fs.writeFile(dbPath, JSON.stringify(json, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ error: "Write error" });
      res.json(json[uuid][index]);
    });
  });
});

// Serve React app for all other routes (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} \nhttp://localhost:${PORT}`)
);
