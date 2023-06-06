import React from 'react';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import { Search } from 'react-bootstrap-icons'
import { Form, InputGroup, Button } from 'react-bootstrap';
import BasicCard from '@features/Modulo3/components/Cards/BasicCard/BasicCard';
import Templates from '@features/Modulo3/jsons/Templates';
import Template from '@features/Modulo3/components/Cards/Template/Template';
import './Plantillas.css';
import { EVALUATION_TEMPLATE_INDEX,EVALUATION_TEMPLATE_CREATE } from '@config/paths';
import { navigateTo, navigateBack } from '@features/Modulo3/utils/functions';


const Index = () => {

	const filters = (
		<Form>
			<Form.Group controlId='searchTemplates' className='pl-indexFilters'>
				<InputGroup>
					<InputGroup.Text id='pl-indexSearch'>
						<Search/>
					</InputGroup.Text>
					<Form.Control placeholder='Buscar plantilla' aria-describedby='ec-indexSearch'/>
				</InputGroup>
			<Button variant='primary' className='pl-indexFilterElement'>Buscar</Button>
			</Form.Group>
		</Form>
	)
	const handleClic=()=>{

	}

	const templates = (
        <div className='pl-templates'>
                {Templates.map((template) =>{
                    return (
                        <div>
                            <Template 
                                image={template.image} 
                                imageStyle={template.imageStyle} 
                                name={template.name}
								onClick={()=>{handleClic}} 
                            />
                        </div>
                    )              
                })}
        </div>
    );

	const content = (
        <>
        {templates}
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
        <Section title={'Plantillas'} content={content} filters={filters}/>
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