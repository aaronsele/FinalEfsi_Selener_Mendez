import { useMemo } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useBudget } from "../context/BudgetContext";
import "./SummaryPage.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function SummaryPage() {
  const { movements } = useBudget();

  // --- PIE: conteo por categoría (porcentaje respecto al total de movimientos)
  const pieData = useMemo(() => {
    const counts = movements.reduce((acc, m) => {
      const cat = m.categoria || "Sin categoría";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    const labels = Object.keys(counts);
    const data = Object.values(counts);

    const colors = [
      "#4B77BE",
      "#E87E04",
      "#26A65B",
      "#F4D03F",
      "#D24D57",
      "#663399",
      "#16A085",
      "#F2784B",
    ];

    return {
      labels,
      datasets: [
        {
          label: "Movimientos por categoría (cantidad)",
          data,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: "#ffffff",
          borderWidth: 1,
        },
      ],
    };
  }, [movements]);

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Porcentaje de movimientos por categoría (cantidad)",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const val = context.parsed;
            const pct = total ? ((val / total) * 100).toFixed(1) : 0;
            return `${context.label}: ${val} (${pct}%)`;
          },
        },
      },
    },
  };

  // --- BAR: total mensual (suma de montos por mes)
  const barData = useMemo(() => {
    // agrupar por mes YYYY-MM
    const totals = movements.reduce((acc, m) => {
      // manejar formatos inesperados
      const fecha = m.fecha || "";
      const mes = fecha.length >= 7 ? fecha.slice(0, 7) : "Sin fecha";
      const monto = Number(m.monto) || 0;
      acc[mes] = (acc[mes] || 0) + monto;
      return acc;
    }, {});

    const labels = Object.keys(totals)
      .filter((l) => l !== "Sin fecha")
      .sort(); // meses ordenados
    // si hay 'Sin fecha' y no hay meses, ponerlo al final
    if (totals["Sin fecha"] && labels.length === 0) labels.push("Sin fecha");

    const dataValues = labels.map((lab) => totals[lab] || 0);

    return {
      labels,
      datasets: [
        {
          label: "Monto total mensual ($)",
          data: dataValues,
          backgroundColor: "rgba(54,162,235,0.7)",
          borderColor: "rgba(54,162,235,1)",
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    };
  }, [movements]);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Evolución mensual (suma de montos)" },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: $${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Monto ($)" },
      },
      x: {
        title: { display: true, text: "Mes (YYYY-MM)" },
      },
    },
  };

  return (
    <section className="summary-page">
      <h2>Resumen y gráficos (Semana 3)</h2>

      {movements.length === 0 ? (
        <p className="summary-empty">No hay movimientos cargados aún. Dale, agregá algo.</p>
      ) : (
        <>
          <div className="charts-row">
            <div className="chart-card">
              <Pie data={pieData} options={pieOptions} />
            </div>

            <div className="chart-card">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

        </>
      )}
    </section>
  );
}
