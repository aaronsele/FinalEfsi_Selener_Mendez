import React from "react";
import "./AppFooter.css";

const AppFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>© {year} Mi Presupuesto — Todos los derechos reservados</p>
      <span className="footer-signature">
        Hecho por García, Mendez y Selener.
      </span>
    </footer>
  );
};

export default AppFooter;
