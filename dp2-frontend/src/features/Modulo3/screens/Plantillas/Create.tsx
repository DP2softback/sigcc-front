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

const dataInicial = {categorias: []}

const Create = () => {
  const [categorias,setCategorias]= useState([]);
  const [file, setFile] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState(dataInicial);
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

  const validateData = (aux) => {
    let validate={
      check: true, 
      msg: ''
    };

    if(aux.nombre==''){
      validate={check:false,msg:'Debe asignar un nombre a la plantilla'}
      return validate;
    }

    if(aux.evaluationType==''){
      validate={check:false,msg:'Debe seleccionar un tipo de evaluación'}
      return validate;
    }

    const subcats = [];

    data.categorias && data.categorias.forEach(categoria => {
      categoria.subcategory.forEach(subcategoria => {
        subcats.push({ id: subcategoria.id,nombre:subcategoria.name });
      });
    });

    console.log(subcats,subcats.length)

    if(subcats.length==0){
      validate={check:false,msg:'Debe seleccionar al menos una categoría y competencia'}
      return validate;
    }

    return validate;
  
  }

  const validateSubcategories = (subcategories) => {
    let validate={
      check: true, 
      msg: ''
    };

    if(subcategories.length=0){
      validate={check:false,msg:'Debe seleccionar al menos una categoría y competencia'}
      return validate;
    }

    return validate;
  }

  const handleGuardar = () => {
    const aux = {
      "evaluationType": selectedOption,
      "nombre": plantillaName,
      "subCategories": []
    };

    // data.categorias.forEach(categoria => {
    //   categoria.subcategory.forEach(subcategoria => {
    //     aux.subCategories.push({ id: subcategoria.id,nombre:subcategoria.name });
    //   });
    // });

    const validate1 = validateData(aux); 

    (async () => {
      if(validate1.check){

        data.categorias.forEach(categoria => {
          categoria.subcategory.forEach(subcategoria => {
            aux.subCategories.push({ id: subcategoria.id,nombre:subcategoria.name });
          });
        });

        //const validate2 = validateSubcategories(aux.subCategories);;
        //if(validate2.check){
          const response = await guardarPlantilla(aux);
          if (response){
            setShowNotification(true); 
            toast.success("Se ha creado correctamente la plantilla");
            closeNotificationOK();
          }
          else{
            setShowNotification(true); 
            toast.error("Ha ocurrido un error en el guardado, por favor vuelva a intentarlo");
            closeNotification();
          }
        // }else{
        //   setShowNotification(true); 
        //   toast.error(validate2.msg);
        //   closeNotification();
        // }
      }else{
        setShowNotification(true); 
        toast.error(validate1.msg);
        closeNotification();
      }
    })();
  };
  function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  const closeNotificationOK = async () => {
    setShowNotification(false);
    await delay(4000);
    navigateTo(EVALUATION_TEMPLATE_INDEX);
  };

  const closeNotification = async () => {
    setShowNotification(false);
    await delay(4000);
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
    
    // if(selectedOption==CONTINUOS_EVALUATION_TYPE){
    //   let nuevo=[{categoriaNombre: categoryName, subcategory:[]}]
    //   setData({
    //     categorias: nuevo,
    //   })
    // }else{
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
    //}
  }

  //Real
  const handleSubcategoryRadioChange = (e: any,subcategoria: string, categoryName: string, subId: string) => {
    // if(selectedOption==CONTINUOS_EVALUATION_TYPE){
    //   //guardo las subcategorias actuales
    //   //console.log("dataBeforeLista",data,data?.categorias[0]?.subcategory.length)
    //   let lista = data?.categorias[0]?.subcategory || [];
    //   //console.log("listaContSubcat",lista,lista.length)
    //   //creo la nueva entrada
    //   let nuevo={id:subId, name: subcategoria}
    //   //verifica si la subcat ya esta para quitarla o pushearla
    //   if(data?.categorias[0]?.subcategory?.find(sub => subcategoria==sub.name)){ 
    //     lista=lista.filter(sub => sub.name!=subcategoria)
    //   }
    //   else{ 
    //     lista.push(nuevo) 
    //   }
    //   //guardo la categoria actual
    //   let aux=data.categorias
    //   //le pongo las nuevas subcats
    //   aux[0].subcategory=lista
    //   //actualizo data
    //   setData({
    //     ...data,
    //     categorias: aux,
    //   })
    // }else{
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
    //}
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
              // type={selectedOption === CONTINUOS_EVALUATION_TYPE ? 'radio' : 'checkbox'}
              type={'checkbox'}
              label={categoria["category-name"]}
              onChange={() => handleRadioChange(categoria["category-name"],index)}
            />
          </Accordion.Header>
          <Accordion.Body>
            <div className="accordionExpPla-bodyitems">
              {categorias && categoria.subcategory.map((subcategoria, subIndex) => (
                <FormCheck
                  key={subcategoria.id}
                  type="checkbox"
                  label={subcategoria.name}
                  onChange={(e)=> handleSubcategoryRadioChange(e,subcategoria.name,categoria["category-name"],subcategoria.id)}
                  checked={isSubcategorySelected(categoria["category-name"], subcategoria.name)}
                />
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
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
    <>
      <Section
        title={''} 
        content={filters} 
      />
      <Section 
        title={''} 
        content={isLoading ? <LoadingScreen/> : content} 
      />
    </>
  );

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Layout
        title={'Nueva Plantilla'}
        subtitle={'Para crear una nueva plantilla, debe elegir el tipo de evaluación y luego las categorías y competencias que desea evaluar'}
        body={body}
      />
    </div>
  );
};

export default Create;