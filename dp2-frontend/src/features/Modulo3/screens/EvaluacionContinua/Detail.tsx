import "bootstrap/dist/css/bootstrap.min.css";
import "./EvaluacionContinua.css";
import BaseForm from "./BaseForm";

const Detail = () => {
  const employee = {
    id: 1,
    FullName: "Angela Quispe Ramirez",
  };

  const categories = [
    {
      id: 1,
      name: "Rendimiento",
      subcategories: [
        "Consecución de objetivos",
        "Calidad del trabajo",
        "Atención al detalle",
        "Puntualidad de las entregas",
        "Gestionar la carga de trabajo y cumplir los plazos",
      ],
    },
    {
      id: 2,
      name: "Habilidades blandas",
      subcategories: [
        "Liderazgo",
        "Comunicación",
        "Resolución de problemas",
        "Pensamiento crítico",
        "Trabajo en equipo",
      ],
    },
    {
      id: 3,
      name: "Conocimientos técnicos",
      subcategories: [
        "Capacidad analítica",
        "Aprendizaje continuo y desarrollo profesional",
        "Conocimientos técnicos",
        "Conocimiento del producto",
        "Resolución de problemas técnicos",
      ],
    },
    {
      id: 4,
      name: "Orientación al cliente",
      subcategories: [
        "Respuesta a las consultas y peticiones",
        "Comprender las necesidades y preferencias",
        "Resolución eficaz de los problemas",
        "Mejora continua de los productos o servicios",
        "Creación y mantenimiento de relaciones positivas",
      ],
    },
    {
      id: 5,
      name: "Creatividad e iniciativa",
      subcategories: [
        "Asunción de riesgos",
        "Mentalidad abierta",
        "Colaboración",
        "Feedback",
        "Nuevas ideas",
      ],
    },
  ];

  const projects = [
    { id: 1, name: "BLF-KC-0012" },
    { id: 2, name: "BLF-KC-0013" },
    { id: 3, name: "BLF-KC-0014" },
    { id: 4, name: "BLF-KC-0015" },
    { id: 5, name: "BLF-KC-0016" },
  ];

  const form = {
    evaluationCategory: 1,
    projectId: 2,
    evaluation: [0, 1, 2, 3, 4],
    additionalComments: "Todo bien la verdad, sigue así.",
  };

  return (
    <BaseForm
      employee={employee}
      categories={categories}
      projects={projects}
      form={form}
      isReadOnly={true}
    />
  );
};

export default Detail;
