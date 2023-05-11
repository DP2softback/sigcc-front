import './Comparator.css'
import { CheckSquareFill, XSquareFill } from 'react-bootstrap-icons'

type ComparatorProps = {
  image: string, 
  imageStyle: string, 
  name: string, 
  items: any[], 
  position: string,
  matchRate: number,
}

const Comparator = ({image, imageStyle, name, items, position, matchRate}: ComparatorProps) => {

  let imageComp = null;
  
  if (image != null) {
    imageComp = (
      <img src={image}
        alt={`Imagen de ${name}`}
        className="comparator-image"
        style={{ borderRadius: imageStyle }}
      />
    );
  }

  function showIcon (icon){
    if(icon == null)
      return <></>
    return <div className="comparator-icon">{icon}</div>;
  }

  function simpleRow (item) {
    return (
      <div className="comparator-row">
        {item ? showIcon(<CheckSquareFill color='green'/>) : showIcon(<XSquareFill color='red'/>)}
      </div>
    );
  }

  function rows () {
    if (items == null)
      return <></>
    return items.map((item, index) => {
      return (
        <div key={index}>
          {simpleRow(item)}
        </div>
      );
    });
  }

  return (
    <div className='comparator-container' style={{width: '310px'}}>
      <div className='comparator-header'>
        <div className="comparator-headerLine">
            <div className='comparator-imageContainer'>{imageComp}</div>
            <div className='comparator-headerInfo'>
                <div className='comparator-title'>{name}</div>
                <div className='comparator-subtitle'>{position}</div>
                <div className='comparator-aditional' style={{ backgroundColor: '#0D6EFD'}}>{matchRate} %</div>
            </div>
        </div>
      </div>
      <div className='comparator-body'>
        {rows()}
      </div>
    </div>
  )
}

export default Comparator