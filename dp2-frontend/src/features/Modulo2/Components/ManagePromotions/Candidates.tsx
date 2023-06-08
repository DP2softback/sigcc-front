import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import Comparator from '@features/Modulo3/components/Comparator/Comparator';
import ComparatorColum from '@features/Modulo3/components/Comparator/ComparatorColum';
import CandidatesList from '@features/Modulo3/jsons/CandidatesList';
import { Button } from 'react-bootstrap';
import './Ascensos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Candidates = ({promotionPosition}) => {

    const filters = (
        <Button variant='primary'>Cambiar Vista</Button>
    )

    const firstColum = (
        <div className='ac-firstColum'>
            <ComparatorColum
                items={[
                'Diseño de interfaces',
                'Figma',
                'UX/UI',
                'HTML',
                'CSS'
                ]}
            />               
        </div>
    );

    const candidates = (
        <div className='asc-candidates-2'>
            <div className='asc-candidates'>
                {CandidatesList.map((candidate) =>{
                    return (
                        <div className='asc-m10px'>
                            <Comparator 
                                image={candidate.image} 
                                imageStyle={candidate.imageStyle} 
                                name={candidate.name} 
                                items={candidate.items} 
                                position={candidate.position} 
                                matchRate={candidate.matchRate}  
                            />
                        </div>
                    )              
                })}
            </div>
        </div>
    );

    const content = (
        <div className='asc-content'>
        {firstColum}
        {candidates}
        </div>
    );

    const body = (
        <Section title={'Trabajadores sugeridos'} content={content} filters={filters}/>
    );

    return (
        <div>
          <Layout
            title={`Ascensos Disponibles - ${promotionPosition}`}
            body={body}
            subtitle='A continuación, se muestran los mejores candidatos para el puesto seleccionado. Asimismo, usted puede agregar a los empleados que crea conveniente.'
          />
        </div>
      );
}

export default Candidates;