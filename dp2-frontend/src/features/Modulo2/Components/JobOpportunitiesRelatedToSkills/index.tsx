import React from 'react'
import JobOpportunityCard from '../JobOpportunityCard/JobOpportunityCard';
import axiosEmployeeGaps from '@features/Modulo2/services/EmployeeGapsServices';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import { Button, Modal } from 'react-bootstrap';
import JobOpportunityCardEmployee from '../JobOpportunityCard/JobOpportunityCardEmployee';

const JobOpportunitiesRelatedToSkills = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [jobOpportunities, setJopOpportunities] = React.useState(null);
    const [jobOptSelected, setJobOptSelected] = React.useState(null)
    const [showRegisterPost, setShowRegisterPost] = React.useState(false);
	const [showConfirm, setShowConfirm] = React.useState(false);
    const [option, setOption] = React.useState(0);

    React.useEffect(() => {
        setIsLoading(true);
        const obj = {
            empleado: 1
        }
        axiosEmployeeGaps
            .post("gaps/searchJobOfferxEmployeePreRegistered", obj)
            .then(function (response) {
                console.log(response)
                setJopOpportunities(response.data);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            })
    }, [])

    const handleSubmit = (jobOpt, opt) => {
        setShowRegisterPost(true);
        setJobOptSelected(jobOpt);
        setOption(opt);
    }

    const handleCloseModalNotify = () => {
		setShowRegisterPost(false)
	}

    const handleCloseConfirm = () => {
        setShowConfirm(false);
    }

    const handlePostulate = () => {
		setIsLoading(true);
		const obj = {
            oferta: jobOptSelected.job_offer__id,
			empleado: 7,
			acepta: option
        }
        axiosEmployeeGaps
            .post("gaps/acceptOrDeclineJobOfferPreRegistered", obj)
            .then(function (response) {
                setShowConfirm(true);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setShowConfirm(true);
                setIsLoading(false);
            })
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
                                    <JobOpportunityCardEmployee jobOpportunity={jobOpt} accept={handleSubmit(jobOpt, 1)} decline={handleSubmit(jobOpt, 0)}/>
                                </div>
                            )
                        })
                            : <p>No se encontraron oportunidades laborales para ti</p>
                        }
                    </>
                }
                <Modal show={showRegisterPost} onHide={handleCloseModalNotify}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mensaje de confirmación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Seguro que desea postular al puesto de {jobOptSelected?.job_offer__offer_introduction}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModalNotify}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handlePostulate}>
                            Aceptar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showConfirm} onHide={handleCloseConfirm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mensaje de alerta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='container-fluid'>
                            <p>Aceptó la postulación al puesto de {jobOptSelected?.job_offer__offer_introduction} con éxito</p>
                            <div className='espacio'>
                                <Button variant="primary" onClick={handleCloseConfirm}>
                                    Aceptar
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default JobOpportunitiesRelatedToSkills;