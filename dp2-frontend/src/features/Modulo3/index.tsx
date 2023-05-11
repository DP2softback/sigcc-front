import Employee from "@features/Modulo3/components/Cards/Employee/Employee";
import JobPosition from "@features/Modulo3/components/Cards/JobPosition/JobPosition";
import Promotion from "@features/Modulo3/components/Cards/Promotion/Promotion";
import Linechart from "@features/Modulo3/components/Charts/Linechart/Linechart";
import Comparator from "@features/Modulo3/components/Comparator/Comparator";
import PieChart from "@features/Modulo3/components/Charts/Piechart/PieChart";
import Index from "@features/Modulo3/screens/EvaluacionContinua/Index";
import Matrix from "./components/Matrix/Matrix";
import Create from "./screens/EvaluacionContinua/Create";

const ListExample = () => {
  return (
    // <>
    //   <PieChart
    //     labels={["Red", "Blue", "Yellow"]}
    //     datasets={[
    //       {
    //         label: "My First Dataset",
    //         data: [300, 50, 100],
    //         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    //         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    //       },
    //     ]}
    //   />

    //   <Employee
    //     id={"19972036"}
    //     name={"Ángela Quispe Ramírez"}
    //     photoURL={
    //       "https://media.istockphoto.com/id/1325565779/photo/smiling-african-american-business-woman-wearing-stylish-eyeglasses-looking-at-camera-standing.jpg?b=1&s=170667a&w=0&k=20&c=0aBawAGIMPymGUppOgw1HmV8MNXB1536B3sX_PP9_SQ="
    //     }
    //     position={"Administrador(a) de base de datos"}
    //     lastEvaluation={"8"}
    //     lastEvaluationUnit={"días"}
    //     area={"Área de Administración de Bases de Datos"}
    //     email={"angela.quispe@empresa.com"}
    //     matchRate={"98"}
    //     characteristics={["Creatividad", "Comunicación", "Trabajo en equipo"]}
    //   />
    //   <div style={{ marginTop: "20px" }}></div>
    //   <JobPosition
    //     name={"UX/UI Designer"}
    //     imageURL={
    //       "https://cdn.dribbble.com/users/13329/screenshots/111441/shot_1297090327.png"
    //     }
    //     availableSince={10}
    //     availableUnit={"días"}
    //     description={
    //       "Profesional que se encarga de diseñar la experiencia de usuario (UX) y la interfaz de usuario (UI) de aplicaciones y sitios web."
    //     }
    //     characteristics={["Creatividad", "Comunicación", "Trabajo en equipo"]}
    //     notificationHasBeenSent={true}
    //   />
    //   <div style={{ marginTop: "20px" }}></div>
    //   <Promotion
    //     id={"19972036"}
    //     name={"Carlos Eduardo Torres"}
    //     photoURL={
    //       "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //     }
    //     currentPosition={"Junior Full Stack Developer"}
    //     possiblePosition={"Semi Senior Full Stack Developer"}
    //     area={"Área de Administración de Bases de Datos"}
    //     email={"carlos.eduardo@empresa.com"}
    //     characteristics={[
    //       "Habilidades blandas",
    //       "Backend avanzado",
    //       "Frontend medio",
    //     ]}
    //   />
    //   <Linechart />
    //   <Comparator
    //     image={""}
    //     imageStyle={""}
    //     name={""}
    //     items={[]}
    //     position={""}
    //     matchRate={0}
    //   />
    // </>
    <>
      <Create
        employee={{
          id: 1,
          FullName: "Angela Quispe Ramirez",
        }}
        categories={[
          { id: 1, name: "Calidad del Trabajo" },
          { id: 2, name: "Habilidades Blandas" },
          { id: 3, name: "Conocimientos" },
          { id: 4, name: "Productividad" },
          { id: 5, name: "Creatividad y Iniciativa" },
        ]}
        projects={[
          { id: 1, name: "BLF-KC-0012"} ,
          { id: 2, name: "BLF-KC-0013"} ,
          { id: 3, name: "BLF-KC-0014"} ,
          { id: 4, name: "BLF-KC-0015"} ,
          { id: 5, name: "BLF-KC-0016"} ,
        ]}
      />
    </>
  );
};

export default ListExample;
