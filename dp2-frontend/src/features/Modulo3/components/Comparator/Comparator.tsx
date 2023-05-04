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

// const Comparator = ({ image, imageStyle, title, items, subtitle}: ComparatorProps) => {
const Comparator = ({ image, imageStyle, name, items, position, matchRate}: ComparatorProps) => {

  let imageComp = null;
  name = 'Angela Hola Campos Ramirez'
  position = 'Administrador(a) de base de datos'
  items = [
    true,
    true,
    false,
    true,
    false
  ]
  image = 'https://media.istockphoto.com/id/1325565779/photo/smiling-african-american-business-woman-wearing-stylish-eyeglasses-looking-at-camera-standing.jpg?b=1&s=170667a&w=0&k=20&c=0aBawAGIMPymGUppOgw1HmV8MNXB1536B3sX_PP9_SQ='
  imageStyle = '100px'
  matchRate = 98

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
        {item ? showIcon(<CheckSquareFill/>) : showIcon(<XSquareFill/>)}
        {/* <div className="comparator-text">{item.text}</div>
        {item.aditional != null ? (
          <div className="comparator-aditional"
            style={{ backgroundColor: item.aditional.backgroundColor }}>
            {item.aditional.text}
          </div>
        ) : (
          <></>
        )} */}
      </div>
    );
  }

//   function badgesRow (item) {
//     return (
//       <div className="comparator-row">
//         {item.list.map((element, index) => {
//           return (
//             <div key={index}
//               className="comparator-badge"
//               style={{ backgroundColor: item.backgroundColor }}>
//               {element}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }

  function rows () {
    if (items == null)
      return <></>
    return items.map((item, index) => {
      return (
        <div key={index}>
          {/* {!item.hasOwnProperty("list") ? simpleRow(item) : badgesRow(item)} */}
          {simpleRow(item)}
        </div>
      );
    });
  }

  return (
    <div className='comparator-container' style={{width: '357px'}}>
      <div className='comparator-header'>
        <div className="comparator-headerLine">
            <div className='comparator-imageContainer'>{imageComp}</div>
            {/* <div className='comparator-title'>{name}</div>
            <div className='comparator-subtitle'>{position}</div> */}
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