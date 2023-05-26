import BasicCard from '../BasicCard/BasicCard'

const JobPosition = ({ name, imageURL, availableSince, availableUnit, description, characteristics, notificationHasBeenSent }) => {
  const rows = [
    {
      text: description
    },
    {
      list: characteristics,
      backgroundColor: '#0D6EFD'
    }
  ];

  if (notificationHasBeenSent) {
    rows.push({
      list: ['Notificación enviada a posibles postulantes'],
      backgroundColor: '#198754'
    })
  }

  return (
    <BasicCard
      image={imageURL}
      imageStyle={'4px'}
      title={name}
      items={rows}
      subtitle={`Disponible desde hace ${availableSince} ${availableUnit}`}
    />
  );
}

export default JobPosition