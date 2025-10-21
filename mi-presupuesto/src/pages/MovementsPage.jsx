import { useBudget } from "../context/BudgetContext";
import "./MovementsPage.css";

export default function MovementsPage() {
  const { movements, deleteMovement } = useBudget();

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
                <div>
                  <strong>{m.descripcion}</strong> — {m.categoria} — {m.tipo} — $
                  {m.monto} — {m.fecha}
                </div>
                <div>
                  <button onClick={() => deleteMovement(m.id)}>Eliminar ❌</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
