import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MOCK_MOVEMENTS } from "../data/mockData";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [movements, setMovements] = useLocalStorage("movements_v1", MOCK_MOVEMENTS);

  const addMovement = (newMov) => setMovements(prev => [newMov, ...prev]);
  const deleteMovement = (id) => setMovements(prev => prev.filter(m => m.id !== id));
  const resetData = () => {
    localStorage.removeItem("movements_v1");
    setMovements(MOCK_MOVEMENTS);
  };
  const updateMovement = (id, updatedData) => {
    setMovements((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updatedData } : m))
    );
  };
  

  return (
    <BudgetContext.Provider value={{ movements, addMovement, deleteMovement, resetData, updateMovement }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
