import ThemeToggle from "../assets/components/ui/ThemeToggle";
import { useBudget } from "../context/BudgetContext";
import "./SettingsPage.css";

export default function SettingsPage() {
  const { resetData } = useBudget();

  const handleReset = () => {
    if (
      window.confirm("⚠️ ¿Estás seguro de que querés borrar todos los movimientos y restaurar los datos iniciales?")
    ) {
      resetData();
      alert("✅ Datos restaurados correctamente.");
    }
  };

  return (
    <section className="settings-page">
      <h2>Ajustes del usuario</h2>
      <ThemeToggle />

      <div className="settings-section">
        <h3>Datos del presupuesto</h3>
        <p>Podés reiniciar los movimientos y volver a los datos originales.</p>
        <button className="reset-btn" onClick={handleReset}>
          🗑️ Limpiar datos
        </button>
      </div>
    </section>
  );
}
