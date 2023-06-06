import './Template.css'

type TemplateProps = {
    image: string, 
    imageStyle: string, 
    name: string, 
    onClick: any,
}

const Template = ({ image, imageStyle, name,onClick}: TemplateProps) => {
    let imageComp = null;
  
    if (image != null) {
        imageComp = (
        <img src={image}
            alt={`Imagen de ${name}`}
            className="template-image"
            style={{ borderRadius: imageStyle }}
        />
        );
    }
    
    return (
        <div className='template-container' onClick={onClick}>
            <div className='template-header'>
            <div className="template-headerLine">
                    <div className='template-imageContainer'>{imageComp}</div>
                    <div className='template-headerInfo'>
                        <div className='template-title'>{name}</div>
                    </div>
            </div>
            </div>
        </div>
      )
}

export default Template