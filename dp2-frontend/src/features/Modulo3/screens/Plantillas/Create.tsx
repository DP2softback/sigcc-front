import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import React,{useState,useEffect} from 'react';
import { Form, Button, InputGroup, Accordion, OverlayTrigger, Tooltip, FormCheck, Dropdown  } from 'react-bootstrap';
import cat from '@features/Modulo3/jsons/Categories';
import {EVALUATION_TEMPLATE_INDEX} from '@features/Modulo3/routes/path';
import { navigateBack, navigateTo } from '@features/Modulo3/utils/functions.jsx';
import ImageUploader from '@features/Modulo3/components/Images/ImageUploader';
import "./Plantillas.css"
import { getCategoriesSubs, guardarPlantilla } from '@features/Modulo3/services/templates';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import { Toast } from 'react-bootstrap';
import { PERFORMANCE_EVALUATION_TYPE,CONTINUOS_EVALUATION_TYPE } from '../../utils/constants'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { delay } from 'lodash';
const dataIni ={
  categoriaNombre: "",
  subcategory: [],
}

const dataIni2 ={
  categorias: [
    {
      categoriaNombre: "",
      subcategory:[ {
        id: "",
        name: ""}
      ]
    }
  ]
}

const Create = () => {
  const [categorias,setCategorias]= useState([]);
  const [file, setFile] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [plantillaName, setPlantillaName] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
      setIsLoading(true);
      (async () => {
          const response = await getCategoriesSubs(selectedOption);
          if(response) setCategorias(response);
        setIsLoading(false);
      })();
  }, [selectedOption]);

  const handleGuardar = () => {
    const aux = {
      "evaluationType": selectedOption,
      "nombre": plantillaName,
      "subCategories": []
    };

    data.categorias.forEach(categoria => {
      categoria.subcategory.forEach(subcategoria => {
        aux.subCategories.push({ id: subcategoria.id,nombre:subcategoria.name });
      });
    });
    (async () => { 
      const response = await guardarPlantilla(aux);
      if (response){
        setShowNotification(true); 
        toast.success("Se ha creado correctamente la plantilla");
        closeNotification();
      }
    })();
  };
  function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  const closeNotification = async () => {
    setShowNotification(false);
    await delay(4000);
    navigateTo(EVALUATION_TEMPLATE_INDEX);
  };

  const handleInputChange = (categoriaId, value) => {
    setInputValues({ ...inputValues, [categoriaId]: value });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleImageChange = (image: File | null) => {
    // Hacer algo con la imagen seleccionada
    if (image) {
    } else {
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
        <option >{CONTINUOS_EVALUATION_TYPE}</option>
        <option >{PERFORMANCE_EVALUATION_TYPE}</option>
      </select>
    </div>
  );

  const handleChangePlantillaName = (event) => {
    setPlantillaName(event.target.value);
  };

  const filters = (
    <Form className='ec-indexFilters'>
      <Form.Group className='flex1'>
        <label className='label-estilizado' htmlFor='nombrePlantilla'>Nombre de plantilla</label>
        <Form.Control placeholder='Ingrese el nombre' id="nombrePlantilla" value={plantillaName} onChange={handleChangePlantillaName}/>
      </Form.Group>
      <Form.Group className='flex1'>
        <div >
          <label className='label-estilizado' htmlFor="dropdown">Evaluación</label>
        </div>
        <Form.Select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
          <option hidden>Seleccione el tipo de evaluación</option>
          <option >{CONTINUOS_EVALUATION_TYPE}</option>
          <option >{PERFORMANCE_EVALUATION_TYPE}</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className='sub-image flex1'>
        <ImageUploader onImageSelect={handleImageChange} />
      </Form.Group>     
    </Form>
  );

  //Real
  const handleRadioChange = (categoryName: string,index: number) => {
    
    if(selectedOption==CONTINUOS_EVALUATION_TYPE){
      let nuevo=[{categoriaNombre: categoryName, subcategory:[]}]
      setData({
        categorias: nuevo,
      })
    }else{
      let nuevo={categoriaNombre: categoryName, subcategory:[]}
      //guardo las categorias ya seleccionadas
      let lista = data ? [...data.categorias] : [];
      //verifico si la cat para eliminarla o pusherla
      if (data && data.categorias && data.categorias.find(cat => categoryName === cat.categoriaNombre)) {
        lista = lista.filter(cat => cat.categoriaNombre !== categoryName);
      } else {
        lista.push(nuevo);
      }
      setData({
        ...data,
        categorias: lista,
      })
    }
  }

  //Real
  const handleSubcategoryRadioChange = (e: any,subcategoria: string, categoryName: string, subId: string) => {
    if(selectedOption==CONTINUOS_EVALUATION_TYPE){
      //guardo las subcategorias actuales
      //console.log("dataBeforeLista",data,data?.categorias[0]?.subcategory.length)
      let lista = data?.categorias[0]?.subcategory || [];
      //console.log("listaContSubcat",lista,lista.length)
      //creo la nueva entrada
      let nuevo={id:subId, name: subcategoria}
      //verifica si la subcat ya esta para quitarla o pushearla
      if(data?.categorias[0]?.subcategory?.find(sub => subcategoria==sub.name)){ 
        lista=lista.filter(sub => sub.name!=subcategoria)
      }
      else{ 
        lista.push(nuevo) 
      }
      //guardo la categoria actual
      let aux=data.categorias
      //le pongo las nuevas subcats
      aux[0].subcategory=lista
      //actualizo data
      setData({
        ...data,
        categorias: aux,
      })
    }else{
      //consigo el indice de la categoria
      const catIndex = data?.categorias.findIndex(cat => cat.categoriaNombre === categoryName);
      //guardo las subcategorias actuales
      let lista = data?.categorias[catIndex]?.subcategory || [];
      //creo la nueva entrada
      let nuevo={id:subId, name: subcategoria}
      //verifica si la subcat ya esta para quitarla o pushearla
      if(catIndex>=0){
        if(data.categorias[catIndex].subcategory.find(sub => subcategoria==sub.name)) 
          lista=lista.filter(sub => sub.name!=subcategoria)
        else lista.push(nuevo)
        //guardo la categoria actual
        let aux=data.categorias
        //le pongo las nuevas subcats
        aux[catIndex].subcategory=lista
        //actualizo data
        setData({
          ...data,
          categorias: aux,
        })
      }
    }
    //console.log("dataS",data)
  }


  const isSubcategorySelected = (categoryName: string, subcategoryName: string): boolean => {
    const catIndex = data?.categorias.findIndex(cat => cat.categoriaNombre === categoryName);
    return data?.categorias[catIndex]?.subcategory.some(sub => sub.name === subcategoryName) || false;
  };


  const accordion = (

    <Accordion alwaysOpen={false} style={{ marginTop: '15px' }}>
      {categorias && categorias.map((categoria, index) => (
        <Accordion.Item eventKey={categoria["category-id"]} key={categoria["category-id"]}>
          <Accordion.Header>
            <FormCheck
              name='opciones'
              type={selectedOption === CONTINUOS_EVALUATION_TYPE ? 'radio' : 'checkbox'}
              label={categoria["category-name"]}
              // label={categoria.name}
              // checked={selectedOptions[categoria.id] === categoria.name}
              onChange={() => handleRadioChange(categoria["category-name"],index)}
              // onChange={() => handleRadioChange(categoria["category-name"])}
              // onChange={() => handleRadioChange(categoria.name)}
              //disabled={!isSelected(categoria.name) && categoria.subcategories && categoria.subcategories.length > 0}
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
                  // checked={data && data.categorias[index].subcategory && data.categorias[index].subcategory.length>0 && data.categorias[index].subcategory.find(sub => subcategoria.name==sub) ? true : false}
                  // checked={data.categorias[index].subcategory.find(sub => subcategoria.name==sub) ? true : false}
                  // checked={
                  //   data &&
                  //   data.categorias &&
                  //   data.categorias[index] &&
                  //   data.categorias[index].subcategory &&
                  //   data.categorias[index].subcategory.length > 0 &&
                  //   data.categorias[index].subcategory.find(sub => sub.name === subcategoria.name)
                  //     ? true
                  //     : false
                  // }
                  onChange={(e)=> handleSubcategoryRadioChange(e,subcategoria.name,categoria["category-name"],subcategoria.id)}
                  checked={isSubcategorySelected(categoria["category-name"], subcategoria.name)}
                  //disabled={!isSelected(categoria.name)}
                  
                  // checked={data.subcategory.find(sub => subcategoria.name==sub) ? true : false}
                  // disabled={}
                  // onChange={(e)=> handleSubcategoryRadioChange(e,subcategoria)}
                  
                  // onChange={(e)=> handleSubcategoryRadioChange(e,subcategoria.name)}
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
      <Button variant='outline-primary me-2' className='boton-dejar mr-20' onClick={() => {
         
         navigateBack();
       }}>
       Volver
     </Button>
        <Button onClick={handleGuardar}>
          Guardar
        </Button>
      </div>
    </>
    ) : (selectedOption==CONTINUOS_EVALUATION_TYPE || selectedOption==PERFORMANCE_EVALUATION_TYPE ?
      <NoDataFound/> :
    (
      <div style={{marginTop:"30px"}}>Seleccione un tipo de evaluación</div>
    )     

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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Layout
        title={'Nueva Plantilla'}
        subtitle={'Si desea crear la plantilla para una evaluación de desempeño puede seleccionar las categorías que desee, sin embargo, si se trata de una evaluación continua, recuerde que solo puede seleccionar una categoría a evaluar.'}
        body={body}
      />
    </div>
  );
};

export default Create;