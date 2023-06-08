import React, { useState, useEffect } from 'react';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import { Search } from 'react-bootstrap-icons'
import { Form, InputGroup, Button } from 'react-bootstrap';
import BasicCard from '@features/Modulo3/components/Cards/BasicCard/BasicCard';
import Templates from '@features/Modulo3/jsons/Templates';
import Template from '@features/Modulo3/components/Cards/Template/Template';
import './Plantillas.css';
import { EVALUATION_TEMPLATE_INDEX,EVALUATION_TEMPLATE_CREATE, EVALUATION_TEMPLATE_EDIT } from '@features/Modulo3/routes/path';
import { navigateTo, navigateBack } from '@features/Modulo3/utils/functions';
import { getPlantillas } from '@features/Modulo3/services/templates';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';

const Index = () => {

	const [plantillasEC,setPlantillasEC]= useState([]);
	const [plantillasED,setPlantillasED]= useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
		  const response = await getPlantillas();
		  if(response){
			setPlantillasEC(response["Evaluación Continua"]);
			setPlantillasED(response["Evaluación de Desempeño"]);
		  } 
		  setIsLoading(false);
		})();
	  }, []);

	// const filters = (
	// 	<Form>
	// 		<Form.Group controlId='searchTemplates' className='pl-indexFilters'>
	// 			<InputGroup>
	// 				<InputGroup.Text id='pl-indexSearch'>
	// 					<Search/>
	// 				</InputGroup.Text>
	// 				<Form.Control placeholder='Buscar plantilla' aria-describedby='ec-indexSearch'/>
	// 			</InputGroup>
	// 		<Button variant='primary' className='pl-indexFilterElement'>Buscar</Button>
	// 		</Form.Group>
	// 	</Form>
	// )
	
	const handleClick=(idPlantilla: number)=>{
		navigateTo(EVALUATION_TEMPLATE_EDIT,{id:idPlantilla});
	}

	const templatesEC = (
        <div className='pl-templates'>
                {plantillasEC && plantillasEC.map((plantilla, index) =>{
                    return (
                        <div>
                            <Template 
                                image={'https://media.istockphoto.com/id/1482790182/es/vector/contabilidad-financiera-y-concepto-de-trabajo-con-estad%C3%ADstica-proceso-de-negocio.jpg?s=612x612&w=0&k=20&c=_rYQgE1bdZpZVyGiyqyD7f1c1fFoMcdk-u7A3oBMR4w='} 
                                imageStyle={'100px'} 
                                name={plantilla["plantilla-nombre"]}
								onClick={()=>{handleClick(plantilla["plantilla-id"])}} 
                            />
                        </div>
                    )              
                })}
        </div>
    );
	const templatesED = (
			
        <div className='pl-templates'>
                {plantillasEC && plantillasED.map((plantilla, index) =>{
                    return (
                        <div>
                            <Template 
                                image={'https://media.istockphoto.com/id/1482790182/es/vector/contabilidad-financiera-y-concepto-de-trabajo-con-estad%C3%ADstica-proceso-de-negocio.jpg?s=612x612&w=0&k=20&c=_rYQgE1bdZpZVyGiyqyD7f1c1fFoMcdk-u7A3oBMR4w='} 
                                imageStyle={'100px'} 
                                name={plantilla["plantilla-nombre"]}
								onClick={()=>{handleClick(plantilla["plantilla-id"])}} 
                            />
                        </div>
                    )              
                })}
        </div>
    );

	const content = (
        <>
		<div className='row'>
      		<div className="col title">Evaluación Continua</div>
    	</div>
        {templatesEC}
		<div className='row'>
      		<div className="col title">Evaluación de Desempeño</div>
    	</div>
		{templatesED}
		<div className='text-end'>
		<Button
			onClick={() => {
				navigateTo(EVALUATION_TEMPLATE_CREATE);
			}}
			>
			Crear nueva plantilla
		</Button>
        </div>
		</>
    );

    const body = (
        <Section title={""}
		content={isLoading ? <LoadingScreen/> : content}/>
	);

	return (
		<div>
			<Layout
				title={`Plantillas de evaluación`}
				body={body}
				subtitle='Plantillas de evaluación continua y de desempeño'
				route={EVALUATION_TEMPLATE_INDEX}
			/>
		</div>
	);
};


export default Index;