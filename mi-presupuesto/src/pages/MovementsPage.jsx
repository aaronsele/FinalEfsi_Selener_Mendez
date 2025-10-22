import { useState } from "react";
import { useBudget } from "../context/BudgetContext";
import "./MovementsPage.css";

export default function MovementsPage() {
  const { movements, deleteMovement, updateMovement } = useBudget();
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({
    descripcion: "",
    categoria: "",
    tipo: "",
    monto: "",
    fecha: "",
  });

  const handleEditClick = (movement) => {
    setEditingId(movement.id);
    setEditedData({
      descripcion: movement.descripcion,
      categoria: movement.categoria,
      tipo: movement.tipo,
      monto: movement.monto,
      fecha: movement.fecha,
    });
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (id) => {
    updateMovement(id, editedData);
    setEditingId(null);
  };

  return (
    <section className="movements-page">
      <div className="movements-header">
        <h2>Listado de movimientos</h2>
      </div>

      {movements.length === 0 ? (
        <p className="movements-empty">No hay movimientos registrados.</p>
      ) : (
        <div className="movements-content">
          <ul className="movements-list">
            {movements.map((m) => (
              <li key={m.id} className="movement-item">
                {editingId === m.id ? (
                  <>
                    <input
                      name="descripcion"
                      value={editedData.descripcion}
                      onChange={handleChange}
                      placeholder="Descripción"
                    />
                    <input
                      name="categoria"
                      value={editedData.categoria}
                      onChange={handleChange}
                      placeholder="Categoría"
                    />

                    {/* 🔽 Select para tipo (Gasto o Ingreso) */}
                    <select
                      name="tipo"
                      value={editedData.tipo}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="Gasto">Gasto</option>
                      <option value="Ingreso">Ingreso</option>
                    </select>

                    <input
                      name="monto"
                      type="number"
                      value={editedData.monto}
                      onChange={handleChange}
                      placeholder="Monto"
                    />
                    <input
                      name="fecha"
                      type="date"
                      value={editedData.fecha}
                      onChange={handleChange}
                    />

                    <button onClick={() => handleSave(m.id)}>💾 Guardar</button>
                    <button onClick={() => setEditingId(null)}>❌ Cancelar</button>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>{m.descripcion}</strong> — {m.categoria} —{" "}
                      {m.tipo} — ${m.monto} — {m.fecha}
                    </div>
                    <div>
                      <button onClick={() => handleEditClick(m)}>✏️ Editar</button>
                      <button onClick={() => deleteMovement(m.id)}>Eliminar ❌</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
