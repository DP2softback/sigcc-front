import BasicCard from '../BasicCard/BasicCard'
import { Building, PersonVcard, Clock, EnvelopeAt } from 'react-bootstrap-icons'

const Promotion = ({id, name, photoURL, currentPosition, possiblePosition, area, email, characteristics}) => {
  const rows = [
    {
      list: characteristics,
      backgroundColor: '#0D6EFD'
    },
    {
      icon: <PersonVcard/>,
      text: id
    },
    {
      icon: <Clock/>,
      text: id
    },
    {
      icon: <Building/>,
      text: area
    },
    {
      icon: <EnvelopeAt/>,
      text: email
    }
  ]

  return (
    <BasicCard
      image={photoURL}
      imageStyle={'100px'}
      title={name}
      items={rows}
      from={currentPosition}
      to={possiblePosition}
    />
  );
}

export default Promotion