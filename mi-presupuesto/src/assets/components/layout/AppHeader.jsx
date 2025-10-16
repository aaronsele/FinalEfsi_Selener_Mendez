import { Link } from "react-router-dom";
import "./AppHeader.css";

export default function AppHeader() {
  return (
    <header>
      <h1>💸 Mi Presupuesto</h1>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Inicio</Link>
        <Link to="/nuevo">Nuevo</Link>
        <Link to="/resumen">Resumen</Link>
        <Link to="/ajustes">Ajustes</Link>
      </nav>
    </header>
  );
}
