import BasicCard from '../BasicCard/BasicCard'
import BasicEmployeeCard from './BasicEmployeeCard'
import { PersonVcard, Briefcase } from 'react-bootstrap-icons'

const EmployeeCard = ({id, name, photoURL, area, puesto, codigo, boton1, boton1Texto, boton1Color, option}) => {
  const rows = [
    {
      icon: <PersonVcard/>,
      text: `${codigo}`
    },
    {
      icon: <Briefcase/>,
      text: `${puesto}`
    }   
  ]

  return (
    <BasicEmployeeCard
      id={id}
      image={photoURL}
      imageStyle={'100px'}
      title={name}
      subtitle={area}
      items={rows}
      button1={boton1}
      button1Text={boton1Texto}
      button1Color={boton1Color}
      widthC='380px'
      option={option}
    />
  );
}

export default EmployeeCard