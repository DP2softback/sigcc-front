import './Comparator.css'

type ComparatorColumProps = { 
    items: any[],
}

const ComparatorColum = ({items}: ComparatorColumProps) => {

    // items = [
    //     'Diseño de interfaces',
    //     'Figma',
    //     'UX/UI',
    //     'HTML',
    //     'CSS'
    // ]

    function simpleRow (item) {
        return (
          <div className="comparator-row-2">
            {item}
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
                {/* <div className='comparator-imageContainer'>{imageComp}</div> */}
                {/* <div className='comparator-title'>{name}</div>
                <div className='comparator-subtitle'>{position}</div> */}
                <div className='comparator-headerInfo'>
                    {/* <div className='comparator-title'>{}</div>
                    <div className='comparator-subtitle'>{}</div> */}
                    <div className='comparator-matchRate'>{'Porcentaje de coincidencia'}</div>
                </div>
            </div>
          </div>
          <div className='comparator-body'>
            {rows()}
          </div>
        </div>
      )
}

export default ComparatorColum;
