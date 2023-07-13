import React from 'react'
import JobOpportunityCard from '../JobOpportunityCard/JobOpportunityCard';
import axiosEmployeeGaps from '@features/Modulo2/services/EmployeeGapsServices';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import { Button, Modal } from 'react-bootstrap';

const JobOpportunitiesRelatedToSkills = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [jobOpportunities, setJopOpportunities] = React.useState(null);
    const [showAceptOpp, setShowAceptOpp] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        const obj = {
            empleado: 1
        }
        axiosEmployeeGaps
            .post("gaps/searchJobOfferxEmployeePreRegistered", obj)
            .then(function (response) {
                setJopOpportunities(response.data);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            })
    }, [])

    const handleClose = () => {
        setShowAceptOpp(false);
    }

    return (
        <>
            <div className='row'>
                <h2>Oportunidades laborales afines a competencias</h2>
                <p className="text-muted">Puestos vacantes que son afines a tus competencias</p>
                <br />
                {isLoading ? <LoadingScreen /> :
                    <>
                        <h3>Puestos disponibles</h3>
                        {jobOpportunities && jobOpportunities.length !== 0 ? jobOpportunities.map((jobOpt, index) => {
                            return (
                                <div className='col-4'>
                                    <JobOpportunityCard jobOpportunity={jobOpt} numBot={3} />
                                </div>
                            )
                        })
                            : <p>No se encontraron oportunidades laborales para ti</p>
                        }
                    </>
                }
                <Modal show={showAceptOpp} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Competencia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* {body} */}
                        <div className='botonCerrar'>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default JobOpportunitiesRelatedToSkills;