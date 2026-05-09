const API_URL = "http://localhost:3000/garage";

// Referencias al DOM
const form = document.getElementById("vehicle-form");
const plateInput = document.getElementById("plate");
const kmInput = document.getElementById("km");
const listContainer =
  document.getElementById("vehicle-list");
const sortSelect = document.getElementById("sort-select");
const refreshBtn = document.getElementById("refresh-btn");
const connectionStatus = document.getElementById(
  "connection-status",
);

// Estado de la aplicación
let vehicles = [];

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
  loadVehicles();
  setupEventListeners();
  monitorConnection();
});

function setupEventListeners() {
  form.addEventListener("submit", handleAddVehicle);
  sortSelect.addEventListener("change", renderList);
  refreshBtn.addEventListener("click", loadVehicles);
}

// CONEXIÓN Y ESTADO DE RED (característica extra)
function monitorConnection() {
  updateConnectionStatus(navigator.onLine);

  window.addEventListener("online", () =>
    updateConnectionStatus(true),
  );
  window.addEventListener("offline", () =>
    updateConnectionStatus(false),
  );
}

function updateConnectionStatus(isOnline) {
  if (isOnline) {
    connectionStatus.textContent = "Conectado";
    connectionStatus.className = "status online";
  } else {
    connectionStatus.textContent = "Sin conexión";
    connectionStatus.className = "status offline";
    alert("⚠️ Se ha perdido la conexión a Internet.");
  }
}

// PETICIONES AJAX AL SERVIDOR
async function loadVehicles() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok)
      throw new Error("Error al cargar los vehículos");

    vehicles = await response.json();
    console.log("Vehículos cargados:", vehicles);
    renderList();
  } catch (error) {
    console.error("Error GET /garage:", error);
    alert(
      "No se pudo cargar la lista de vehículos. ¿Está el servidor activo?",
    );
  }
}

async function createVehicle(plate, km) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plate, km }),
    });

    if (response.status === 409) {
      alert(
        "❌ Error: La matrícula ya existe en la base de datos.",
      );
      return false;
    }

    if (!response.ok) {
      const err = await response.json();
      throw new Error(
        err.error || "Error al crear el vehículo",
      );
    }

    const data = await response.json();
    console.log("Vehículo creado:", data);
    return true;
  } catch (error) {
    console.error("Error POST /garage:", error);
    alert(error.message);
    return false;
  }
}

async function updateVehicleKm(id, plate, km) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plate, km }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(
        err.error || "Error al actualizar el vehículo",
      );
    }

    console.log(`Vehículo ${id} actualizado a ${km} km`);
    return true;
  } catch (error) {
    console.error("Error PUT /garage:", error);
    alert(error.message);
    return false;
  }
}

async function deleteVehicle(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(
        err.error || "Error al eliminar el vehículo",
      );
    }

    console.log(`Vehículo ${id} eliminado`);
    return true;
  } catch (error) {
    console.error("Error DELETE /garage:", error);
    alert(error.message);
    return false;
  }
}

// LÓGICA DEL FORMULARIO Y VALIDACIONES
async function handleAddVehicle(event) {
  event.preventDefault();

  const plate = plateInput.value.trim().toUpperCase();
  const km = parseInt(kmInput.value, 10) || 0;

  // Validación de matrícula
  if (!isValidPlate(plate)) {
    alert(
      "❌ Formato de matrícula incorrecto.\nUse formato español: 1234 ABC o A-1234-BC",
    );
    return;
  }

  const success = await createVehicle(plate, km);
  if (success) {
    form.reset();
    kmInput.value = "0";
    await loadVehicles();
  }
}

/**
 * Valida matrículas españolas.
 * Formatos aceptados:
 * - Actual: 1234 ABC (4 dígitos, espacio, 3 letras)
 * - Antiguo: A-1234-BC o A-123456 (letra, guion, 4-6 dígitos, guion opcional, 2 letras opcionales)
 */
function isValidPlate(plate) {
  const modern = /^\d{4}\s?[A-Z]{3}$/;
  const old = /^[A-Z]{1,2}-?\d{4,6}(-?[A-Z]{1,2})?$/;
  return modern.test(plate) || old.test(plate);
}

// RENDERIZADO DE LA LISTA
function renderList() {
  listContainer.innerHTML = "";

  if (vehicles.length === 0) {
    listContainer.innerHTML =
      '<p class="empty-message">No hay vehículos registrados.</p>';
    return;
  }

  // Ordenar según criterio seleccionado (característica extra)
  const sortBy = sortSelect.value;
  const sorted = [...vehicles].sort((a, b) => {
    if (sortBy === "plate") {
      return a.plate.localeCompare(b.plate, "es");
    }
    return a.id - b.id;
  });

  sorted.forEach((vehicle) => {
    const card = document.createElement("div");
    card.className = "vehicle-card";
    card.dataset.id = vehicle.id;

    card.innerHTML = `
            <div class="vehicle-info">
                <div class="vehicle-plate">🚘 ${vehicle.plate}</div>
                <div class="vehicle-km">${vehicle.km.toLocaleString("es-ES")} km</div>
            </div>
            <div class="vehicle-actions">
                <button class="edit" onclick="editKm(${vehicle.id}, '${vehicle.plate}', ${vehicle.km})">✏️ Editar km</button>
                <button class="delete" onclick="removeVehicle(${vehicle.id})">🗑️ Eliminar</button>
            </div>
        `;

    listContainer.appendChild(card);
  });
}

// ACCIONES DESDE LA INTERFAZ
window.editKm = async function (id, plate, currentKm) {
  const newKmStr = prompt(
    `Introduce el nuevo kilometraje para ${plate}:`,
    currentKm,
  );
  if (newKmStr === null) return; // Cancelar

  const newKm = parseInt(newKmStr, 10);
  if (isNaN(newKm) || newKm < 0) {
    alert("❌ El kilometraje debe ser un número positivo.");
    return;
  }

  const success = await updateVehicleKm(id, plate, newKm);
  if (success) {
    await loadVehicles();
  }
};

window.removeVehicle = async function (id) {
  const confirmDelete = confirm(
    "¿Estás seguro de que quieres eliminar este vehículo?",
  );
  if (!confirmDelete) return;

  const success = await deleteVehicle(id);
  if (success) {
    await loadVehicles();
  }
};
