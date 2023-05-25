import BasicCard from '../BasicCard/BasicCard'
import { Calendar2, Calendar2Event, PeopleFill } from 'react-bootstrap-icons'

const Training = ({id, name, photoURL, description, creationDate, eventDate, employees}) => {
  const rows = [
    {
      icon: <Calendar2/>,
      text: `Fecha de creación: `,
      aditional: {
        text: `${creationDate}`,
        backgroundColor: '#FFF',
        color: '#000'
      }
    },
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
      icon: <PeopleFill/>,
      text: `Cantidad de empleados: `,
      aditional: {
        text: `${employees}`,
        backgroundColor: '#FFF',
        color: '#000'
      }
    }    
  ]

  const ruta = `/modulo1/capacitacion/detalle/${id}`

  return (
    <BasicCard
      id={id}
      image={photoURL}
      imageStyle={'100px'}
      title={name}
      subtitle={description}
      items={rows}
      button1='SI'
      button1Text='Detalle'
      button1Link= {ruta}
      button2='NO'
      button2Text='Agregar'
      options='SI'
    />
  );
}

export default Training