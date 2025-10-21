import { useBudget } from "../context/BudgetContext";
import "./MovementsPage.css";

export default function MovementsPage() {
  const { movements, deleteMovement } = useBudget();

  return (
    <section>
      <h2>Listado de movimientos</h2>
      {movements.length === 0 ? (
        <p>No hay movimientos registrados.</p>
      ) : (
        <ul className="movements-list">
          {movements.map((m) => (
            <li key={m.id} className="movement-item">
              <div>
                <strong>{m.descripcion}</strong> — {m.categoria} — {m.tipo} — $
                {m.monto} — {m.fecha}
              </div>
              <div>
                <button onClick={() => deleteMovement(m.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
