import React, { useEffect, useState, useCallback } from "react";
import SoftAvatar from "components/SoftAvatar";
import Button from "@mui/material/Button";
import team2 from "assets/images/team-2.jpg";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

export default function useNewPatientsTableData(searchQuery, newPatientAdded) {
  const [data, setData] = useState({ newColumns: [], newRows: [] });
  const navigate = useNavigate();

  const traducirGenero = (genero) => {
    const traducciones = {
      male: "Masculino",
      female: "Femenino",
      other: "Otro",
      "not specified": "No especificado",
    };
    return traducciones[genero] || "Género no especificado";
  };

  const normalizeString = (str) => {
    return str ? str.toLowerCase().replace(/[\s\-\(\)]/g, "") : "";
  };

  const sanitizePatientData = (patient) => {
    const firstName = patient?.first_name?.trim() || "Nombre no proporcionado";
    const lastName = patient?.last_name?.trim() || "Apellido no proporcionado";
    const phone = patient?.phone ? normalizeString(patient.phone) : "Teléfono no proporcionado";
    const email = patient?.email?.trim() || "Correo no proporcionado";

    return {
      id: patient?.id || "000",
      name: `${firstName} ${lastName}`.trim(),
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      gender: traducirGenero(patient?.gender),
      status: patient?.status || "Estatus no proporcionado",
    };
  };

  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("PatientsDB", 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("patients")) {
          db.createObjectStore("patients", { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  };

  const clearIndexedDB = async () => {
    const db = await openDB();
    const transaction = db.transaction("patients", "readwrite");
    const store = transaction.objectStore("patients");
    store.clear();
    return new Promise((resolve) => {
      transaction.oncomplete = resolve;
    });
  };

  const saveToIndexedDB = async (patients) => {
    const db = await openDB();
    const transaction = db.transaction("patients", "readwrite");
    const store = transaction.objectStore("patients");

    patients.forEach((patient) => {
      const sanitizedPatient = sanitizePatientData(patient);
      store.put(sanitizedPatient);
    });

    return new Promise((resolve, reject) => {
      transaction.oncomplete = resolve;
      transaction.onerror = reject;
    });
  };

  const getFromIndexedDB = async () => {
    const db = await openDB();
    const transaction = db.transaction("patients", "readonly");
    const store = transaction.objectStore("patients");
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const fetchNewPatients = useCallback(
    debounce(async (forceUpdate = false) => {
      try {
        if (forceUpdate) {
          await clearIndexedDB();
        }
        let newPatients = await getFromIndexedDB();

        if (!newPatients.length || forceUpdate) {
          const response = await fetch(
            `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/?q=${encodeURIComponent(
              searchQuery
            )}`
          );

          if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
          }

          newPatients = await response.json();
          await saveToIndexedDB(newPatients);
        }

        if (!Array.isArray(newPatients)) {
          console.error("Formato inválido de nuevos pacientes:", newPatients);
          return;
        }

        const normalizedSearch = normalizeString(searchQuery);
        const filteredPatients = newPatients.filter((patient) => {
          const sanitizedPatient = sanitizePatientData(patient);
          const fullName = normalizeString(sanitizedPatient.name);
          const phone = normalizeString(sanitizedPatient.phone);
          const email = normalizeString(sanitizedPatient.email);

          return (
            fullName.includes(normalizedSearch) ||
            phone.includes(normalizedSearch) ||
            email.includes(normalizedSearch)
          );
        });

        const newRows = filteredPatients.map((patient) => {
          const sanitizedPatient = sanitizePatientData(patient);
          return {
            foto: <SoftAvatar src={team2} size="sm" variant="rounded" />,
            id: sanitizedPatient.id,
            nombre: sanitizedPatient.name,
            teléfono: sanitizedPatient.phone,
            correo: sanitizedPatient.email,
            género: sanitizedPatient.gender,
            estatus: sanitizedPatient.status,
            Acciones: (
              <Button
                onClick={() => {
                  const selectedPatient = JSON.stringify(sanitizedPatient);
                  localStorage.setItem("selectedPatient", selectedPatient);
                  navigate("/PatientDetails", { state: { patient: sanitizedPatient } });
                }}
                variant="text"
                color="primary"
              >
                Ver Detalles
              </Button>
            ),
          };
        });

        setData({
          newColumns: [
            { name: "foto", align: "center" },
            { name: "id", align: "left" },
            { name: "nombre", align: "left" },
            { name: "teléfono", align: "left" },
            { name: "correo", align: "left" },
            { name: "género", align: "left" },
            { name: "estatus", align: "left" },
            { name: "Acciones", align: "center" },
          ],
          newRows,
        });
      } catch (error) {
        console.error("Error al obtener los nuevos pacientes:", error);
      }
    }, 500),
    [searchQuery]
  );

  useEffect(() => {
    fetchNewPatients();
  }, [fetchNewPatients, newPatientAdded]);

  useEffect(() => {
    fetchNewPatients(true);
  }, []);

  return data;
}
