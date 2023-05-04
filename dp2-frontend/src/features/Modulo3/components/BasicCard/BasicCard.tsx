import './BasicCard.css'
import Destination from '../../assets/icons/Destination.svg'

type BasicCardProps = {
  image: string, 
  imageStyle: string, 
  title: string, 
  items: any[], 
  subtitle?: string,
  from?: string,
  to?: string
}

const BasicCard = ({ image, imageStyle, title, items, subtitle, from, to }: BasicCardProps) => {
  let imageComp = null;

  if (image != null) {
    imageComp = (
      <img src={image}
        alt={`Imagen de ${title}`}
        className="basicCard-image"
        style={{ borderRadius: imageStyle }}
      />
    );
  }

  function showIcon (icon){
    if(icon == null)
      return <></>
    return <div className="basicCard-icon">{icon}</div>;
  }

  function simpleRow (item) {
    return (
      <div className="basicCard-row">
        {showIcon(item.icon)}
        <div className="basicCard-text">{item.text}</div>
        {item.aditional != null ? (
          <div className="basicCard-aditional"
            style={{ backgroundColor: item.aditional.backgroundColor }}>
            {item.aditional.text}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }

  function badgesRow (item) {
    return (
      <div className="basicCard-row">
        {item.list.map((element, index) => {
          return (
            <div key={index}
              className="basicCard-badge"
              style={{ backgroundColor: item.backgroundColor }}>
              {element}
            </div>
          );
        })}
      </div>
    );
  }

  function rows () {
    if (items == null)
      return <></>
    return items.map((item, index) => {
      return (
        <div key={index}>
          {!item.hasOwnProperty("list") ? simpleRow(item) : badgesRow(item)}
        </div>
      );
    });
  }

  function subtitleComp (){
    if (subtitle != null)
      return <div className='basicCard-subtitle'>{subtitle}</div>
    if (from != null && to != null)
      return (
        <div className="basicCard-promotion">
          <img src={Destination} alt="de - hasta" className='basicCard-promotionIcon'/>
          <div className='basicCard-promotionPositions'>
            <div className="basicCard-promtionText">
              <div className="basicCard-promtionIndicator">De:</div>
              <div>{from}</div>
            </div>
            <div className="basicCard-promtionText">
              <div className="basicCard-promtionIndicator">A:</div>
              <div>{to}</div>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className='basicCard-container' style={{width: '477px'}}>
      <div className='basicCard-header'>
        <div className="basicCard-headerLine">
          <div className='basicCard-imageContainer'>{imageComp}</div>
          <div className='basicCard-headerInfo'>
            <div className='basicCard-title'>{title}</div>
            {subtitleComp()}
          </div>
        </div>
      </div>
      <div className='basicCard-body'>
        {rows()}
      </div>
    </div>
  )
}

export default BasicCard