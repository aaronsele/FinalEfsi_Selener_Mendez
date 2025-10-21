import { useParams, useNavigate } from "react-router-dom";
import MovementForm from "../assets/components/forms/MovementForm";
import { useBudget } from "../context/BudgetContext";

export default function EditMovementPage() {
  const { id } = useParams();
  const { movements } = useBudget();
  const navigate = useNavigate();

  const mov = movements.find((m) => m.id === id);
  if (!mov) {
    navigate("/movimientos");
    return null;
  }

  return (
    <section>
      <MovementForm initialValues={mov} />
    </section>
  );
}
