import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import React,{useEffect, useState} from 'react';
import { Form, Button, InputGroup, Accordion, OverlayTrigger, Tooltip, FormCheck, Dropdown  } from 'react-bootstrap';
import cat from '@features/Modulo3/jsons/Categories';
import "./Plantillas.css"
import {EVALUATION_TEMPLATE_INDEX} from '@config/paths';
import { navigateTo } from '@features/Modulo3/utils/functions.jsx';
import ModalAddCategorie from '@features/Modulo3/components/Modals/ModalAddCategorie';
import ImageUploader from '@features/Modulo3/components/Images/ImageUploader';
import { getCategories,getPlantilla,getPlantillasEditar,guardarEditar } from '@features/Modulo3/services/templates';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import { PERFORMANCE_EVALUATION_TYPE,CONTINUOS_EVALUATION_TYPE } from '../../utils/constants';

const dataIni ={
  categoriaNombre: "",
  subcategorias: [],
}

const Edit = () => {
  const [show,setShow]=useState(false);
  const [showAC,setShowAC]=useState(false);
  const [categorias,setCategorias]= useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(dataIni);
  const [plantilla,setPlantilla]=useState([]);
  const [editar,setEditar]=useState({});
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getPlantillasEditar(7,PERFORMANCE_EVALUATION_TYPE);
      console.log("Categories",response);
      if (response && response.Categories) {
        setCategorias(response.Categories);
        setEditar(response);
      }
      const response2 = await getPlantilla(7,PERFORMANCE_EVALUATION_TYPE);
      console.log("Plantilla",response2);

      if(response2) setPlantilla(response2);
      setSelectedOption(response2[0].evaluationType);
      setIsLoading(false);
    })();
  }, []);

  const handleInputChange = (categoriaId, value) => {
    setInputValues({ ...inputValues, [categoriaId]: value });
  };

  const handleGuardarEditar = () => {
    const aux = editar;
    console.log(aux);
    console.log(categorias);
    (async () => { 
      console.log("entro");
      const response = await guardarEditar(aux, categorias);
      if (response) console.log("Funciono",response);
    })();
  };
  

  const handleRadioChange = (categoryName) => {
    if (selectedOption === "Evaluación Continua") {
      const updatedCategorias = categorias.map((categoria) => ({
        ...categoria,
        "Category-active": categoria.name === categoryName,
        subcategory: categoria.subcategory.map((sub) => ({
          ...sub,
          "subcategory-isActive": categoria.name === categoryName,
        })),
      }));
  
      setCategorias(updatedCategorias);
    } else if (selectedOption === "Evaluación de Desempeño") {
      const updatedCategorias = categorias.map((categoria) => {
        if (categoria.name === categoryName) {
          return {
            ...categoria,
            "Category-active": !categoria["Category-active"],
            subcategory: categoria.subcategory.map((sub) => ({
              ...sub,
              "subcategory-isActive": !categoria["Category-active"],
            })),
          };
        }
        return categoria;
      });
  
      setCategorias(updatedCategorias);
    }
    console.log("update",categorias)
  };
  
  


  const handleUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleImageChange = (image: File | null) => {

  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const filters = (
    <>
    {plantilla && plantilla.length >0 ? (
      <>
      <Form className='ec-indexFilters'>
      <Form.Group className='flex1'>
        <label className='label-estilizado' htmlFor='nombrePlantilla'>Nombre de plantilla</label>
        <Form.Control readOnly id="nombrePlantilla" value={plantilla[0].name}/>
      </Form.Group>
      <Form.Group className='flex1'>
        <div >
          <label className='label-estilizado' htmlFor="dropdown">Evaluación</label>
        </div>
        <Form.Select  disabled={true} value={plantilla[0].evaluationType} onChange={(e) => handleOptionSelect(e.target.value)}>
          <option hidden>Seleccione el tipo de evaluación</option>
          <option >Evaluación Continua</option>
          <option >Evaluación de Desempeño</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className='sub-image flex1'>
        <ImageUploader onImageSelect={handleImageChange} />
      </Form.Group>     
    </Form>
      </>
    ):(<NoDataFound/>)}
    </>
    

);
  const [inputValues, setInputValues] = useState({});
  /*
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
      setInputValues({ ...inputValues, [categoriaId]: '' }); 
    }
  };
*/
  const handleSubcategoryRadioChange = (e, subcategoria) => {
    const updatedCategorias = categorias.map((categoria) => {
      const updatedSubcategory = categoria.subcategory.map((sub) => {
        if (sub.nombre === subcategoria.nombre) {
          return {
            ...sub,
            "subcategory-isActive": e.target.checked,
          };
        }
        return sub;
      });
      return {
        ...categoria,
        subcategory: updatedSubcategory,
      };
    });

    setCategorias(updatedCategorias);
  };
  

  const accordion = (
    <Accordion alwaysOpen={false}>
      {categorias && categorias.length > 0 && categorias.map((categoria, index) => (
        <Accordion.Item eventKey={categoria.name} key={categoria.id}>
          <Accordion.Header>
            <FormCheck
              name='opciones'
              type={selectedOption === "Evaluación Continua" ? 'radio' : 'checkbox'}
              label={categoria.name}  
              checked={categoria["Category-active"]}            
              onChange={() => handleRadioChange(categoria.name)}
            />
          </Accordion.Header>
  
          <Accordion.Body>
            <div className="accordionExpPla-bodyitems">
              {categoria.subcategory.map((subcategoria, index) => (
                
                <FormCheck
                  key={subcategoria.id}
                  type="checkbox"
                  label={subcategoria.nombre}
                  checked={subcategoria["subcategory-isActive"]}
                  multiple={selectedOption === "Evaluación de Desempeño"}
                  onChange={(e)=> handleSubcategoryRadioChange(e,subcategoria)}
                  disabled={selectedOption === "Evaluación de Desempeño" && !categoria["Category-active"]}
                />
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
  const content = (
    <>
    {categorias && categorias.length >0 ? (
      <>
       {accordion}
      </>
    ):(<NoDataFound/>)}
   
    <div className="text-end mt-32" >
    <Button variant='secundary' className='boton-dejar mr-20' onClick={() => {
         
          navigateTo(EVALUATION_TEMPLATE_INDEX);
        }}>
        Dejar de editar
      </Button>
      <Button onClick={handleGuardarEditar}>
        Guardar
      </Button>
    </div>
    </>
  )

  const body = (
    <Section title={null} content={content} filters={filters} filtersStyle={{width:'100%'}}/>
  );
  return (
    <div>
      {plantilla && plantilla.length >0 ?(
        <>
        <ModalAddCategorie showAC={showAC} setShowAC={setShowAC} categorias={categorias} setCategorias={setCategorias}></ModalAddCategorie>
        <Layout
        title={'Plantilla - '+plantilla[0].name }
        body={body}
    />
        </>
      ): (<NoDataFound/>)}

    </div>
  );
};

export default Edit;