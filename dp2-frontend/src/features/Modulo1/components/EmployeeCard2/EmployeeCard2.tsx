import BasicCard from '../BasicCard/BasicCard'
import { PersonVcard, Briefcase } from 'react-bootstrap-icons'

const EmployeeCard2 = ({id, name, photoURL, area, puesto, codigo, boton1, boton1Color, option}) => {
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
    <BasicCard
      id={id}
      image={photoURL}
      imageStyle={'100px'}
      title={name}
      subtitle={area}
      items={rows}
      button1='SI'
      button1Text={boton1}
      button1Color={boton1Color}
      widthC='300px'
      option={option}
      typeCard="Empleado"
    />
  );
}

export default EmployeeCard2