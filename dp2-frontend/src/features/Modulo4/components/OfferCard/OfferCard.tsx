import BasicCard3 from '../BasicCard3/BasicCard3'
import { Calendar2, Calendar2Event, PeopleFill } from 'react-bootstrap-icons'

const Offer = ({id, name, photoURL, description, creationDate, eventDate}) => {
    const rows = [
        {
            icon: <Calendar2/>,
            text: `Fecha limite de postulación: `,
            aditional: {
                text: `${creationDate}`,
                backgroundColor: '#FFF',
                color: '#000'
            }
        },
        {
            icon: <Calendar2Event/>,
            text: `Rango Salarial: `,
            aditional: {
                text: `${eventDate}`,
                backgroundColor: '#FFF',
                color: '#000'
            }
        }
    ]

    const ruta = `/modulo4/joboffer/detail/${id}`

    return (
        <BasicCard3
            id={id}
            image={"https://www.becas-santander.com/content/dam/becasmicrosites/blog/metodolog%C3%ADas-de-desarrollo-de-software.jpg"}
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

export default Offer