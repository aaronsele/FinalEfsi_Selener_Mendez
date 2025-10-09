import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BudgetProvider } from "./context/BudgetContext";
import AppHeader from "./assets/components/layout/AppHeader";
import MovementsPage from "./pages/MovementsPage";
import AddMovementPage from "./pages/AddMovementPage";
import EditMovementPage from "./pages/EditMovementPage";
import SummaryPage from "./pages/SummaryPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <BudgetProvider>
        <AppHeader />
        <main style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<MovementsPage />} />
            <Route path="/nuevo" element={<AddMovementPage />} />
            <Route path="/editar/:id" element={<EditMovementPage />} />
            <Route path="/resumen" element={<SummaryPage />} />
            <Route path="/ajustes" element={<SettingsPage />} />
          </Routes>
        </main>
      </BudgetProvider>
    </BrowserRouter>
  );
}

export default App;
