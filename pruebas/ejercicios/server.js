const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, "garage.json");

app.use(express.json());
app.use(cors());

// BASE DE DATOS JSON (persistencia en archivo)
function loadDatabase() {
  if (fs.existsSync(DB_PATH)) {
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  }
  return { vehicles: [], nextId: 1 };
}

function saveDatabase(db) {
  fs.writeFileSync(
    DB_PATH,
    JSON.stringify(db, null, 2),
    "utf-8",
  );
}

let db = loadDatabase();

// RUTAS API

// GET /garage - Listar todos los vehículos
app.get("/garage", (req, res) => {
  res.json(db.vehicles);
});

// POST /garage - Añadir vehículo
app.post("/garage", (req, res) => {
  const { plate, km } = req.body;
  if (!plate) {
    return res
      .status(400)
      .json({ error: "La matrícula es obligatoria." });
  }

  const upperPlate = plate.trim().toUpperCase();
  const exists = db.vehicles.find(
    (v) => v.plate === upperPlate,
  );
  if (exists) {
    return res
      .status(409)
      .json({ error: "La matrícula ya existe." });
  }

  const newVehicle = {
    id: db.nextId++,
    plate: upperPlate,
    km: parseInt(km, 10) || 0,
  };

  db.vehicles.push(newVehicle);
  saveDatabase(db);

  res.json(newVehicle);
});

// PUT /garage/:id - Actualizar vehículo
app.put("/garage/:id", (req, res) => {
  const { id } = req.params;
  const { plate, km } = req.body;

  const vehicle = db.vehicles.find(
    (v) => v.id === parseInt(id, 10),
  );
  if (!vehicle) {
    return res
      .status(404)
      .json({ error: "Vehículo no encontrado." });
  }

  if (plate !== undefined)
    vehicle.plate = plate.trim().toUpperCase();
  if (km !== undefined) vehicle.km = parseInt(km, 10) || 0;

  saveDatabase(db);
  res.json({ message: "Vehículo actualizado." });
});

// DELETE /garage/:id - Eliminar vehículo
app.delete("/garage/:id", (req, res) => {
  const { id } = req.params;
  const idx = db.vehicles.findIndex(
    (v) => v.id === parseInt(id, 10),
  );

  if (idx === -1) {
    return res
      .status(404)
      .json({ error: "Vehículo no encontrado." });
  }

  db.vehicles.splice(idx, 1);
  saveDatabase(db);

  res.json({ message: "Vehículo eliminado." });
});

app.listen(PORT, () => {
  console.log(
    `Servidor del taller en http://localhost:${PORT}`,
  );
});
