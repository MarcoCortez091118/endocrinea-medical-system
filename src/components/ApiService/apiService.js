// Función para abrir o crear una base de datos IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("PatientsDB", 1);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("patients")) {
        db.createObjectStore("patients", { keyPath: "id" });
      }
    };

    request.onsuccess = event => resolve(event.target.result);
    request.onerror = event => reject(event.target.error);
  });
}

// Función para guardar datos en IndexedDB
async function saveToIndexedDB(data) {
  if (!Array.isArray(data)) {
    console.error("Los datos recibidos no son un array:", data);
    return Promise.reject(new Error("Formato de datos inválido en IndexedDB"));
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("patients", "readwrite");
    const store = transaction.objectStore("patients");

    store.clear(); // Limpiar datos previos antes de guardar nuevos
    data.forEach(patient => store.add(patient));

    transaction.oncomplete = () => resolve();
    transaction.onerror = event => reject(event.target.error);
  });
}


// Función para recuperar datos de IndexedDB
async function getFromIndexedDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("patients", "readonly");
    const store = transaction.objectStore("patients");
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = event => reject(event.target.error);
  });
}

// Servicio de API con IndexedDB en lugar de localStorage
const apiService = {
  getPatients: async () => {
    try {
      const cachedData = await getFromIndexedDB();
      if (cachedData.length > 0) {
        console.log("Datos obtenidos desde IndexedDB...");
        return cachedData;
      }

      console.log("Haciendo petición a la API...");
      const response = await fetch("https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients");

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      let responseData = await response.json();

      // Verificar si `responseData.data` existe y es un array
      const patients = Array.isArray(responseData.data) ? responseData.data : [];

      // Guardar en IndexedDB solo si hay datos válidos
      if (patients.length > 0) {
        await saveToIndexedDB(patients);
      }

      return patients;
    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
      throw error;
    }
  },
};


export default apiService;