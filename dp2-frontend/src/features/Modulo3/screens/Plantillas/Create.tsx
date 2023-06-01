import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import React,{useState,useEffect} from 'react';
import { Form, Button, InputGroup, Accordion, OverlayTrigger, Tooltip, FormCheck, Dropdown  } from 'react-bootstrap';
import cat from '@features/Modulo3/jsons/Categories';
import {EVALUATION_TEMPLATE_INDEX} from '@config/paths';
import { navigateTo } from '@features/Modulo3/utils/functions.jsx';
import ImageUploader from '@features/Modulo3/components/Images/ImageUploader';
import "./Plantillas.css"
import { getCategoriesSubs } from '@features/Modulo3/services/templates';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';

const dataIni ={
  categoriaNombre: "",
  subcategory: [],
}

// const dataIni2 ={
//   categorias: [
//     {
//       categoriaNombre: "",
//       subcategory:[ {
//         id: "",
//         name: ""}
//       ]
//     }
//   ]
// }

const Create = () => {

  const [showAC,setShowAC]=useState(false);
  const [categorias,setCategorias]= useState([]);
  const [file, setFile] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState(dataIni);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getCategoriesSubs();
      if(response) setCategorias(response);
      console.log("a",response)
      setIsLoading(false);
    })();
  }, []);

  const handleInputChange = (categoriaId, value) => {
    setInputValues({ ...inputValues, [categoriaId]: value });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleImageChange = (image: File | null) => {
    // Hacer algo con la imagen seleccionada
    if (image) {
      console.log('Imagen seleccionada:', image);
    } else {
      console.log('Imagen borrada');
    }
  };

  const handleAddSubcategory = (categoriaId) => {
    const inputValue = inputValues[categoriaId];
    if (inputValue) {
      const updatedCategorias = categorias.map((categoria) => {
        if (categoria.id === categoriaId) {
          return {
            ...categoria,
            subcategories: [...categoria.subcategories, inputValue],
          };
        }
        return categoria;
      });

      setCategorias(updatedCategorias);
      setInputValues({ ...inputValues, [categoriaId]: '' }); // Limpiar el valor del input
    }
  };

  const dropdown =(
    <div>
      <div >
        <label className='label-estilizado' htmlFor="dropdown">Evaluación</label>
      </div>
      <select style={{borderRadius:5, height:'36px', paddingLeft: '10px', borderColor:'#ced4da', }} id="dropdown" value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
        <option >Selecciona el tipo</option>
        <option >Evaluación continua</option>
        <option >Evaluación de desempeño</option>
      </select>
    </div>
  );

  const filters = (
    <Form className='ec-indexFilters'>
      <Form.Group className='flex1'>
        <label className='label-estilizado' htmlFor='nombrePlantilla'>Nombre de plantilla</label>
        <Form.Control placeholder='Ingrese el nombre' id="nombrePlantilla"/>
      </Form.Group>
      <Form.Group className='flex1'>
        <div >
          <label className='label-estilizado' htmlFor="dropdown">Evaluación</label>
        </div>
        <Form.Select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
          <option hidden>Seleccione el tipo de evaluación</option>
          <option >Evaluación continua</option>
          <option >Evaluación de desempeño</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className='sub-image flex1'>
        <ImageUploader onImageSelect={handleImageChange} />
      </Form.Group>     
    </Form>
);

// const handleRadioChange = (categoryName: string) => {
//   let nuevo={
//     categoriaNombre: categoryName,
//     subcategory:[]
//   }
//   let lista
//   if(data) lista=[]  
//   else lista=data.categorias;
//   lista.push(nuevo)
//   setData({
//     ...data,
//     categorias: lista,
//   })
// }

const handleRadioChange = (categoryName: string) => {
  setData({
    ...data,
    categoriaNombre: categoryName,
    subcategory: [],
  })
}


// const handleSubcategoryRadioChange = (e: any,subcategoria: string, catIndex: number, subId: string) => {
//   let lista=data.categorias[catIndex].subcategory;
//   console.log("e",e)
//   let nuevo={id:subId, name: subcategoria}
//   if(data.categorias[catIndex].subcategory.find(sub => subcategoria==sub.name)) 
//     lista=lista.filter(sub => sub.name!=subcategoria)
//   else lista.push(nuevo)
//   // e.target.checked ? lista.push(subcategoria) : lista.filter(sub => sub!=subcategoria)
//   let aux=data.categorias;
//   aux[catIndex].subcategory=lista
//   console.log("nuevo",nuevo)
//   console.log("lista",lista)
//   console.log("aux",aux)
//   setData({
//     ...data,
//     categorias: aux,
//   })
//   console.log("data",data)
// }

const handleSubcategoryRadioChange = (e: any,subcategoria: string) => {
  let lista=data.subcategory
  console.log("e",e)
  if(data.subcategory.find(sub => subcategoria==sub)) 
    lista=lista.filter(sub => sub!=subcategoria)
  else lista.push(subcategoria)
  // e.target.checked ? lista.push(subcategoria) : lista.filter(sub => sub!=subcategoria)
  setData({
    ...data,
    subcategory: lista,
  })
  console.log("data",data)
}

const accordion = (
  <Accordion alwaysOpen={false}>
    {categorias && categorias.map((categoria, index) => (
      <Accordion.Item eventKey={categoria["category-id"]} key={categoria["category-id"]}>
        <Accordion.Header>
          <FormCheck
            name='opciones'
            type={selectedOption === 'Evaluación continua' ? 'radio' : 'checkbox'}
            label={categoria["category-name"]}
            // label={categoria.name}
            // checked={selectedOptions[categoria.id] === categoria.name}
            onChange={() => handleRadioChange(categoria["category-name"])}
            // onChange={() => handleRadioChange(categoria.name)}
          />
        </Accordion.Header>
        <Accordion.Body>
          <div className="accordionExpPla-bodyitems">
            {/* {categorias && categoria.subcategories.map((subcategoria, index) => ( */}
            {categorias && categoria.subcategory.map((subcategoria, subIndex) => (
              <FormCheck
                // key={subcategoria}
                key={subcategoria.id}
                type="checkbox"
                // label={subcategoria}
                label={subcategoria.name}
                // checked={data.subcategory.find(sub => subcategoria==sub) ? true : false}
                // checked={data && data.categorias[index].subcategory.find(sub => subcategoria.name==sub) ? true : false}
                checked={data.subcategory.find(sub => subcategoria.name==sub) ? true : false}
                // disabled={}
                // onChange={(e)=> handleSubcategoryRadioChange(e,subcategoria)}
                // onChange={(e)=> handleSubcategoryRadioChange(e,subcategoria.name,index,subcategoria.id)}
                onChange={(e)=> handleSubcategoryRadioChange(e,subcategoria.name)}
              />
            ))}
          </div>

          {/* <div className="row ingreso-sub mt-32">
            <Form.Control
              className="input-sub"
              placeholder="Ingrese una nueva subcategoría"
              value={inputValues[categoria.id] || ''}
              onChange={(event) =>
                handleInputChange(categoria.id, event.target.value)
              }
            />
            <Button
              className="boton-subcategorie mt-32"
              variant="secondary"
              onClick={() => handleAddSubcategory(categoria.id)}
            >
              <span>+</span>
            </Button>
          </div> */}
        </Accordion.Body>
      </Accordion.Item>
    ))}
    {/* <div className="text-end mt-32">
      <Button onClick={() => setShowAC(true)}>+ Añadir nueva categoría</Button>
    </div> */}
  </Accordion>
);

  const content = 
    categorias && categorias.length>0 ? (
    <>
      {accordion}
      <div className="text-end mt-32" >
        <Button>
          Guardar
        </Button>
      </div>
    </>
    ) : ( 
    <NoDataFound/>
  );

  const body = (
    <Section 
      title={null} 
      content={isLoading ? <LoadingScreen/> : content} 
      filters={filters} 
      filtersStyle={{width:'100%'}}/>
  );

  return (
    <div>
      <Layout
        title={'Nueva Plantilla'}
        subtitle={'Si desea crear la plantilla para una evaluación de desempeño puede seleccionar las categorías que desee, sin embargo, si se trata de una evaluación continua, recuerde que solo puede seleccionar una categoría a evaluar.'}
        body={body}
      />
    </div>
  );
};

export default Create;