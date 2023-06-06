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
  const [categorias,setCategorias]= useState([]);
  const [file, setFile] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  // const [data, setData] = useState(dataIni);
  const [data, setData] = useState(null);
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

//CHATGPT
// const handleRadioChange = (categoryName: string, index: number) => {
//   let nuevo = {
//     categoriaNombre: categoryName,
//     subcategory: []
//   };

//   let lista = data ? [...data.categorias] : [];

//   if (selectedOption === 'Evaluación continua') {
//     // Si se selecciona una categoría en Evaluación continua,
//     // se deseleccionan las demás categorías
//     lista = lista.map(cat => ({
//       ...cat,
//       subcategory: []
//     }));
//   }

//   const existingCategoryIndex = lista.findIndex(cat => cat.categoriaNombre === categoryName);

//   if (existingCategoryIndex !== -1) {
//     // Si la categoría ya está seleccionada, se remueve
//     lista.splice(existingCategoryIndex, 1);
//   } else {
//     // Si la categoría no está seleccionada, se agrega
//     lista.push(nuevo);
//   }

//   setData({
//     ...data,
//     categorias: lista
//   });

//   console.log("dataC",data)
// };

//Funcionamiento para EvaDesem
// const handleRadioChange = (categoryName: string,index: number) => {
//   console.log("index",index)
//   let nuevo={
//     categoriaNombre: categoryName,
//     subcategory:[]
//   }
//   let lista
//   if(data==null) lista=[]  
//   else lista=data.categorias;
  
//   // if(data.categorias && data.categorias.find(cat => categoryName==cat.categoriaNombre)) 
//   //   lista=lista.filter(cat => cat.categoriaNombre!=categoryName)
//   // else lista.push(nuevo)
//   if (data && data.categorias && data.categorias.find(cat => categoryName === cat.categoriaNombre)) {
//     lista = lista.filter(cat => cat.categoriaNombre !== categoryName);
//   } else {
//     lista.push(nuevo);
//   }
  
//   console.log("lista",lista)
//   setData({
//     ...data,
//     categorias: lista,
//   })
//   console.log("data",data)
// }

//EvaCont
// const handleRadioChange = (categoryName: string) => {
//   setData({
//     ...data,
//     categoriaNombre: categoryName,
//     subcategory: [],
//   })
// }

//Real
const handleRadioChange = (categoryName: string,index: number) => {
  
  if(selectedOption=='Evaluación continua'){
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
  console.log("dataC",data)
}

//ChatGPT
// const handleSubcategoryRadioChange = (e: any, subcategoria: string, catIndex: number, subId: string) => {
//   const lista = data?.categorias[catIndex]?.subcategory || [];
//   const nuevo = { id: subId, name: subcategoria };

//   if (selectedOption === 'Evaluación continua') {
//     // Si se está en Evaluación continua, solo se permite seleccionar una subcategoría por categoría
//     const selectedSubcategories = lista.filter(sub => sub.name === subcategoria);

//     if (selectedSubcategories.length > 0) {
//       // Si la subcategoría ya está seleccionada, se deselecciona
//       const updatedList = lista.filter(sub => sub.name !== subcategoria);
//       const updatedCategories = data.categorias.map((cat, index) => ({
//         ...cat,
//         subcategory: catIndex === index ? updatedList : cat.subcategory
//       }));

//       setData({
//         ...data,
//         categorias: updatedCategories
//       });
//       return;
//     }
//   }

//   // Si no se cumple la regla de Evaluación continua o la subcategoría no estaba seleccionada, se agrega a la lista
//   const updatedList = [...lista, nuevo];
//   const updatedCategories = data.categorias.map((cat, index) => ({
//     ...cat,
//     subcategory: catIndex === index ? updatedList : cat.subcategory
//   }));

//   setData({
//     ...data,
//     categorias: updatedCategories
//   });

//   console.log("dataS",data)
// };


//Funcioamiento para EvaDesem
// const handleSubcategoryRadioChange = (e: any,subcategoria: string, catIndex: number, subId: string) => {
//   // let lista=data.categorias[catIndex].subcategory;
//   let lista = data?.categorias[catIndex]?.subcategory || [];
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

//EvaCont
// const handleSubcategoryRadioChange = (e: any,subcategoria: string) => {
//   let lista=data.subcategory
//   console.log("e",e)
//   if(data.subcategory.find(sub => subcategoria==sub)) 
//     lista=lista.filter(sub => sub!=subcategoria)
//   else lista.push(subcategoria)
//   // e.target.checked ? lista.push(subcategoria) : lista.filter(sub => sub!=subcategoria)
//   setData({
//     ...data,
//     subcategory: lista,
//   })
//   console.log("data",data)
// }

//Real
const handleSubcategoryRadioChange = (e: any,subcategoria: string, categoryName: string, subId: string) => {
  if(selectedOption=='Evaluación continua'){
    //guardo las subcategorias actuales
    console.log("dataBeforeLista",data,data?.categorias[0]?.subcategory.length)
    let lista = data?.categorias[0]?.subcategory || [];
    console.log("listaContSubcat",lista,lista.length)
    //creo la nueva entrada
    let nuevo={id:subId, name: subcategoria}
    //verifica si la subcat ya esta para quitarla o pushearla
    if(data?.categorias[0]?.subcategory?.find(sub => subcategoria==sub.name)){ 
      lista=lista.filter(sub => sub.name!=subcategoria)
      console.log("1")
    }
    else{ 
      lista.push(nuevo) 
      console.log("2")
    }
    console.log("listaContSubcatPushed",lista)
    //guardo la categoria actual
    let aux=data.categorias
    console.log("aux",aux)
    //le pongo las nuevas subcats
    aux[0].subcategory=lista
    //actualizo data
    setData({
      ...data,
      categorias: aux,
    })
    // setData(prevData => ({
    //   ...prevData,
    //   categorias: aux,
    // }));
    //console.log("data",data)
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
  console.log("dataS",data)
}


const isSubcategorySelected = (categoryName: string, subcategoryName: string): boolean => {
  // const category = data?.categorias.find(cat => cat.categoriaNombre === categoryName);
  const catIndex = data?.categorias.findIndex(cat => cat.categoriaNombre === categoryName);
  //console.log("subcatSelectes",category)
  return data?.categorias[catIndex]?.subcategory.some(sub => sub.name === subcategoryName) || false;
  // return category?.subcategory.some(sub => sub.name === subcategoryName) || false;
};


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