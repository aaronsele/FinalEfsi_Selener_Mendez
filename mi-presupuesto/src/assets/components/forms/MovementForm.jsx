import { useFormik } from "formik";
import * as Yup from "yup";
import { useBudget } from "../../../context/BudgetContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./MovementForm.css";


export default function MovementForm({ initialValues }) {
  const { addMovement } = useBudget();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues || {
      descripcion: "",
      categoria: "",
      tipo: "gasto",
      monto: "",
      fecha: "",
    },
    validationSchema: Yup.object({
      descripcion: Yup.string().required("La descripción es obligatoria"),
      categoria: Yup.string().required("La categoría es obligatoria"),
      tipo: Yup.string().oneOf(["ingreso", "gasto"]).required(),
      monto: Yup.number()
        .typeError("Debe ser un número")
        .positive("Debe ser positivo")
        .required("El monto es obligatorio"),
      fecha: Yup.date().required("La fecha es obligatoria"),
    }),
    onSubmit: (values) => {
      const newMovement = { ...values, id: uuidv4() };
      addMovement(newMovement);
      navigate("/movimientos");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="movement-form">
      <h2>{initialValues ? "Editar movimiento" : "Nuevo movimiento"}</h2>

      <label>Descripción</label>
      <input
        type="text"
        name="descripcion"
        onChange={formik.handleChange}
        value={formik.values.descripcion}
      />
      {formik.touched.descripcion && formik.errors.descripcion && (
        <p className="error">{formik.errors.descripcion}</p>
      )}

      <label>Categoría</label>
      <input
        type="text"
        name="categoria"
        onChange={formik.handleChange}
        value={formik.values.categoria}
      />
      {formik.touched.categoria && formik.errors.categoria && (
        <p className="error">{formik.errors.categoria}</p>
      )}

      <label>Tipo</label>
      <select
        name="tipo"
        onChange={formik.handleChange}
        value={formik.values.tipo}
      >
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
      </select>

      <label>Monto</label>
      <input
        type="number"
        name="monto"
        onChange={formik.handleChange}
        value={formik.values.monto}
      />
      {formik.touched.monto && formik.errors.monto && (
        <p className="error">{formik.errors.monto}</p>
      )}

      <label>Fecha</label>
      <input
        type="date"
        name="fecha"
        onChange={formik.handleChange}
        value={formik.values.fecha}
      />
      {formik.touched.fecha && formik.errors.fecha && (
        <p className="error">{formik.errors.fecha}</p>
      )}

      <button type="submit">
        {initialValues ? "Guardar cambios" : "Agregar movimiento"}
      </button>
    </form>
  );
}
