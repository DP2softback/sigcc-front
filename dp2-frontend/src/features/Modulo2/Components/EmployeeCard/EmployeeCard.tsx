
import { Building, PersonVcard, Clock, Briefcase, EnvelopeAt, Clipboard } from 'react-bootstrap-icons'
import BasicCard from '../ComponentsManagePromotions/Cards/BasicCard/BasicCard';

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
  matchRate?: number,
  characteristics?: string[]
}

const EmployeeCard = ({
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
    text: "Porcentaje de adecuación",
    aditional: {
      text: `${matchRate} %`,
      backgroundColor: "#0D6EFD",
    },
  };

  const rows = [
    {
      icon: <Clock />,
      text: "Última evaluación continua",
      aditional: {
        text: `${lastEvaluation} ${lastEvaluationUnit}`,
        backgroundColor: "#DC3545",
      },
    },
    {
      icon: <PersonVcard />,
      text: code,
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
    rows.splice(0, 1, matchRateItem)
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

export default EmployeeCard