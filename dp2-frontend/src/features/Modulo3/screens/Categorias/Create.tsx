import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import TableCompetencia from '@features/Modulo3/components/Tables/TableCompetencia';
import React, { useState } from "react";
import { Form, Button, InputGroup, Accordion, OverlayTrigger, Tooltip, FormCheck, Dropdown, Table  } from 'react-bootstrap';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import { formatDashboardJson, navigateBack, navigateTo } from '@features/Modulo3/utils/functions';
import './Categorias.css'

const competenciasIni= ["Competencia 1","Competencia 2","Competencia 3"]

// Componente de la pantalla
const CreateCategory = () => {
  // Estado para almacenar las subcategorías existentes
  const [subcategorias, setSubcategorias] = useState([]);
  const [competencias, setCompetencias] = useState(competenciasIni);
  const [isLoading, setIsLoading] = useState(false);
  const [categoriaName, setCategoriaName] = useState('');
  const [subcategoriaName, setSubcategoriaName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');


  // Estado para almacenar los valores del formulario
  const [formValues, setFormValues] = useState([]);

  // Función para manejar los cambios en los campos del formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Función para manejar el envío del formulario
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();

  //   // Validación de campos
  //   if (!formValues.subcategoryName || !formValues.selectedCompetition) {
  //     alert("Por favor, complete todos los campos.");
  //     return;
  //   }

  //   // Crear nueva subcategoría y asociar competencia
  //   const newSubcategory = {
  //     name: formValues.subcategoryName,
  //     competition: formValues.selectedCompetition
  //   };

  //   // Agregar la nueva subcategoría al estado de subcategorías
  //   setSubcategories((prevSubcategories) => [
  //     ...prevSubcategories,
  //     newSubcategory
  //   ]);

  //   // Limpiar los valores del formulario
  //   setFormValues({
  //     subcategoryName: "",
  //     selectedCompetition: ""
  //   });

  //   // Mostrar confirmación de éxito
  //   alert("La subcategoría ha sido creada exitosamente.");
  // };

  const handleAgregar = () => {
    const newSubcategory = {
      nombre: subcategoriaName,
      competencia: selectedOption
    };

    subcategorias.push(newSubcategory)

    setSubcategoriaName("");
    setSelectedOption('');
  };

  const handleEliminar = (nombre: string) => {
    const subcatAux = subcategorias.filter(sub => sub.nombre != nombre);
    setSubcategorias(subcatAux)
  };


  const handleGuardar = () => {
    
  };

  const handleChangeSubcategoriaName = (event) => {
    setSubcategoriaName(event.target.value);
  };

  const handleChangeCategoriaName = (event) => {
    setCategoriaName(event.target.value);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  function getBackgroundColor(categoryIndex: number) {
    return categoryIndex % 2 == 0
      ? 'bg-blue'
      : 'bg-white';
  }

  const table = (
    <Table striped className='ca-tableCategorie'>
      <thead className='bg-white'>
        <tr>
          <th className='subcategorie_name'>Subcategoría</th>
          <th className='competencia_name'>Competencia</th>
          <th className='text-end competencia'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {subcategorias.map((row, index) => {
          const rowStyle = `matrixRow ${getBackgroundColor(index)}`;
          return (
            <tr key={row.id} className={rowStyle}>
              <td className='subcategorie_name'>{row.nombre}</td>
              <td className='competencia_name'>{row.competencia}</td>
              <td className='text-center'>                
                <div className='acciones'>
                <Button variant="outline-danger" className='accion' onClick={() => handleEliminar(row.nombre)}>
                  Eliminar
                </Button>
                </div>

              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  const filters = (
    <Form className='ca-indexFilters'>
      <Form.Group className='flex1 w-100'>
        <label className='label-estilizado' htmlFor='nombreCategoría'>Nombre de categoría</label>
        <Form.Control placeholder='Ingrese el nombre de la categoría' id="nombreCategoría" value={categoriaName} onChange={handleChangeCategoriaName}/>
      </Form.Group>
    </Form>
  );

  const subcategoriasForm = (
    <Form className='ca-indexFilters'>
      <Form.Group className='flex1 ca-nameSubcat'>
        <label className='label-estilizado' htmlFor='nombreSubcategoría'>Nombre de subcategoría</label>
        <Form.Control placeholder='Ingrese el nombre de la subcategoría' id="nombreSubcategoría" value={subcategoriaName} onChange={handleChangeSubcategoriaName}/>
      </Form.Group>
      <Form.Group className='flex1 ca-competencia'>
        <div >
          <label className='label-estilizado' htmlFor="dropdown">Competencia relacionada</label>
        </div>
        <Form.Select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
          <option hidden>Seleccione la competencia relacionada</option>
          {competencias.map((competencia,index) => {
            return (
              <option> {competencia} </option>
            );
			  })}
        </Form.Select>
      </Form.Group>
      <Button className="ca-buttonAdd" onClick={handleAgregar}>
        Agregar
      </Button>
    </Form>
  );

  const content = (
		<>
			{competencias && competencias.length > 0 ? (
				<div className="row mt-32">
          {subcategoriasForm}
					{table}
				</div>
			) : (
				<NoDataFound />
			)}
			<div className="text-end">
				<Button
					variant="outline-primary me-2"
					onClick={() => {
						navigateBack();
					}}>
					Volver
				</Button>
        <Button onClick={handleGuardar}>
          Guardar
        </Button>
			</div>
		</>
	);

  const body = (
    <>
      <Section
        title={'Categoría'}
        content={filters}
      />
      <Section
        title={'Subcategorías'}
        content={isLoading ? <LoadingScreen/> : content}
      />
    </>
  );

  return (
		<div>
			<Layout
				title={`Nueva Categoría`}
				body={body}
				subtitle={`Ingrese los datos requeridos para crear la nueva categoría de evaluación`}
			/>
		</div>
	);

};

export default CreateCategory;
