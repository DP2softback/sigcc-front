import BasicCard2 from '../BasicCard2/BasicCard2'
import { BarChartLineFill, Calendar2Event, PeopleFill } from 'react-bootstrap-icons'

const Training = ({id, name, photoURL, description, creationDate, eventDate, employees}) => {
  const rows = [
    {
      icon: <Calendar2Event/>,
      text: `Fecha de evento: `,
      aditional: {
        text: `${eventDate}`,
        backgroundColor: '#FFF',
        color: '#000'
      }
    },
    {
      icon: <BarChartLineFill/>,
      text: `Progreso: `,
      aditional: {
        text: `${employees}`,
        backgroundColor: '#FFF',
        color: '#000'
      }
    }    
  ]

  const ruta = `/modulo1/empleado/cursoempresa/sessions/${id}`

  return (
    <BasicCard2
      id={id}
      image={photoURL}
      imageStyle={'100px'}
      title={name}
      subtitle={description}
      items={rows}
      button1='SI'
      button1Text='Ir al curso'
      button1Link= {ruta}
      button2='NO'
      button2Text='Agregar'
      options='SI'
    />
  );
}

export default Training