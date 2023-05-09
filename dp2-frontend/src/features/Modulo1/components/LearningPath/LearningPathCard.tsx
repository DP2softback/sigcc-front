import BasicCard from '../BasicCard/BasicCard'
import Rate from '../Rate'
import { Calendar2, BarChart, PeopleFill } from 'react-bootstrap-icons'

const LearningPath = ({id, name, photoURL, description, creationDate, eventDate, employees}) => {
  const rows = [
    {
      icon: <BarChart/>,
      text: `Valoración: `,
      aditional: {
        text: <Rate></Rate>,
        backgroundColor: '#FFF',
        color: '#000',
        margin: '5px'
      }

    },
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
      icon: <PeopleFill/>,
      text: `Cantidad de empleados: `,
      aditional: {
        text: `${employees}`,
        backgroundColor: '#FFF',
        color: '#000'
      }
    }     
  ]

  return (
    <BasicCard
      image={photoURL}
      imageStyle={'100px'}
      title={name}
      subtitle={description}
      items={rows}
      button1='SI'
      button1Text='Detalle'
      button2='NO'
      button2Text='Agregar'
      options='SI'
    />
  );
}

export default LearningPath