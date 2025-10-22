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

  // 🎛️ Filtros
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");

  // 🔍 Filtrar movimientos
  const filteredMovements = movements.filter((m) => {
    const matchText = m.descripcion
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchCategory = filterCategory
      ? m.categoria === filterCategory
      : true;

    // 🧩 comparo todo en minúsculas para evitar errores
    const matchType = filterType
      ? m.tipo.toLowerCase() === filterType.toLowerCase()
      : true;

    return matchText && matchCategory && matchType;
  });

  // ✏️ Edición
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

      {/* 🎚️ Barra de búsqueda y filtros */}
      <div className="movements-filters">
        <input
          type="text"
          placeholder="Buscar por descripción..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {[...new Set(movements.map((m) => m.categoria))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <option value="gasto">Gasto</option>
          <option value="ingreso">Ingreso</option>
        </select>
      </div>

      {filteredMovements.length === 0 ? (
        <p className="movements-empty">No hay movimientos registrados.</p>
      ) : (
        <div className="movements-content">
          <ul className="movements-list">
            {filteredMovements.map((m) => (
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
                      <span
                        style={{
                          color:
                            m.tipo.toLowerCase() === "gasto"
                              ? "red"
                              : "green",
                          fontWeight: "bold",
                        }}
                      >
                        {m.tipo}
                      </span>{" "}
                      — ${m.monto} — {m.fecha}
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
