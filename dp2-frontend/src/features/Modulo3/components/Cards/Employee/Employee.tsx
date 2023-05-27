import BasicCard from '../BasicCard/BasicCard'
import { Building, PersonVcard, Clock, Briefcase, EnvelopeAt, Clipboard } from 'react-bootstrap-icons'

type EmployeeProps = {
  id: string,
  name: string,
  photoURL: string,
  position: string,
  code: string,
  lastEvaluation: string,
  lastEvaluationUnit: string,
  area: string,
  email: string,
  matchRate?: string,
  characteristics?: string[]
}

const Employee = ({
  id,
  name,
  photoURL,
  position,
  code,
  lastEvaluation,
  lastEvaluationUnit,
  area,
  email,
  matchRate,
  characteristics,
}: EmployeeProps) => {
  
  const matchRateItem = {
    icon: <Clipboard />,
    text: "Porcentaje de coincidencia",
    aditional: {
      text: `${matchRate} %`,
      backgroundColor: "#0D6EFD",
    },
  };

  const rows = [
    {
      icon: <Clock />,
      text: "Última evaluación de desempeño",
      aditional: {
        text: `${lastEvaluation} ${lastEvaluationUnit}`,
        backgroundColor: "#DC3545",
      },
    },
    {
      icon: <PersonVcard />,
      text: id,
    },
    {
      icon: <Building />,
      text: area,
    },
    {
      icon: <Briefcase />,
      text: position,
    },
    {
      icon: <EnvelopeAt />,
      text: email,
    },
    {
      list: characteristics,
      backgroundColor: "#DC3545",
    },
  ];

  if (matchRate) {
    rows.splice(1, 0, matchRateItem)
  }

  return (
    <BasicCard
      image={photoURL}
      imageStyle={"100px"}
      title={name}
      subtitle={position}
      items={rows}
    />
  );
};

export default Employee