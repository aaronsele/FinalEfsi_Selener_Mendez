import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <header
      style={{
        backgroundColor: "#1e293b",
        color: "white",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
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
