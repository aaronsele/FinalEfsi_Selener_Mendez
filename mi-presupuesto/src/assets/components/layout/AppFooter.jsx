import React from "react";
import "./AppFooter.css";

const AppFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>© {year} Mi Presupuesto — Todos los derechos reservados</p>
      <span className="footer-signature">
        Hecho por Garcia, Mendez y Selener 
      </span>
    </footer>
  );
};

export default AppFooter;
