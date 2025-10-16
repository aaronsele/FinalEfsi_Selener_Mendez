import { useBudget } from "../context/BudgetContext";
import "./MovementsPage.css";

export default function MovementsPage() {
  const { movements } = useBudget();

  return (
    <section>
      <h2>Listado de movimientos</h2>
      <ul>
        {movements.map((m) => (
          <li key={m.id}>
            <strong>{m.descripcion}</strong> — {m.categoria} — {m.tipo} — $
            {m.monto}
          </li>
        ))}
      </ul>
    </section>
  );
}
