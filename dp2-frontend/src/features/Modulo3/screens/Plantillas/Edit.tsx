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
import { getCategories } from '@features/Modulo3/services/templates';
const Edit = () => {
  const [show,setShow]=useState(false);
  const [showAC,setShowAC]=useState(false);
  const [categorias,setCategorias]= useState(cat);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getCategories();
      if(response) setCategorias(response);
      setIsLoading(false);
    })();
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleImageChange = (image: File | null) => {

  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const dropdown =(
    <div>
      <div >
        <label className='label-estilizado' htmlFor="dropdown">Evaluación</label>
      </div>
    <select style={{borderRadius:5, height:'36px'}} id="dropdown" value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
      <option >Selecciona...</option>
      <option >Evaluación continua</option>
      <option >Evaluación de desempeño</option>
    </select>

  </div>
  );

  const filters = (
        <Form className='ec-indexFilters'>
          <Form.Group>
          <label className='label-estilizado' htmlFor='nombrePlantilla'>Nombre de plantilla</label>
          <Form.Control placeholder='Comunicación Oral' id="nombrePlantilla" disabled={true}/>
          </Form.Group>
          <Form.Group className='dropdown-edit'>
              {dropdown }
          </Form.Group>
          <Form.Group className='sub-image'>
            <ImageUploader onImageSelect={handleImageChange} />
          </Form.Group>     
        </Form>
  );
  const [inputValues, setInputValues] = useState({});
  const handleInputChange = (categoriaId, value) => {
    setInputValues({ ...inputValues, [categoriaId]: value });
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
  


  const accordion =(
    <Accordion alwaysOpen={true}> 
    {
        categorias.map((categoria, index) => (
            <Accordion.Item eventKey={categoria.id}>
                <Accordion.Header>
                    <FormCheck 
                        type='checkbox'
                        label={categoria.name}
                    />
                </Accordion.Header>
                <Accordion.Body>
                    <div className="accordionExpPla-bodyitems">
                    {
                    categoria.subcategories.map((subcategoria,index) => (
                        <FormCheck 
                            type='checkbox'
                            label={subcategoria}
                        />
                        )
                    )
                    }
                    </div>
                    <div className='row ingreso-sub mt-32'>
                                       
                    <Form.Control className='input-sub' placeholder='Ingrese una nueva subcategoría'     value={inputValues[categoria.id] || ''}
                onChange={(event) => handleInputChange(categoria.id, event.target.value)}></Form.Control>
                    <Button className='boton-subcategorie mt-32' variant='secundary' onClick={() => handleAddSubcategory(categoria.id)} >
                    <span >+</span>
                    </Button>
                
                    </div>

                </Accordion.Body>
              
            </Accordion.Item>
        )
        )
    }
    <div className="text-end mt-32">
    <Button onClick={()=>setShowAC(true)}>
        + Añadir nueva categoría
      </Button>
    </div>
    </Accordion>
)
  const content = (
    <>
    {accordion}
    <div className="text-end mt-32" >
    <Button variant='secundary' className='boton-dejar mr-20' onClick={() => {
         
          navigateTo(EVALUATION_TEMPLATE_INDEX);
        }}>
        Dejar de editar
      </Button>
      <Button>
        Guardar
      </Button>
    </div>
    </>
  )

  const body = (
    <Section title={null} content={content} filters={filters}/>
  );
  return (
    <div>
       <ModalAddCategorie showAC={showAC} setShowAC={setShowAC} categorias={categorias} setCategorias={setCategorias}></ModalAddCategorie>
        <Layout
        title={'Plantilla - Comunicación Oral'}
        body={body}
    />
    </div>
  );
};

export default Edit;