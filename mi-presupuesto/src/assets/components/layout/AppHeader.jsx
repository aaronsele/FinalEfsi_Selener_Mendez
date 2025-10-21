
import { Link } from "react-router-dom";
import "./AppHeader.css";

export default function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-left">
        <h1>💸 Mi Presupuesto</h1>
      </div>
      <nav className="header-right">
        <Link to="/">Inicio</Link>
        <Link to="/nuevo">Nuevo</Link>
        <Link to="/resumen">Resumen</Link>
        <Link to="/ajustes">Ajustes</Link>
      </nav>
    </header>
  );
}
