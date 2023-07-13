import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './JobOpportunitySelected.css';
import { Button, Modal } from 'react-bootstrap';
import axiosEmployeeGaps from '@features/Modulo2/services/EmployeeGapsServices';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';

const JobOpportunitySelected = () => {

	const navigate = useNavigate();
	const { state } = useLocation();
	const [isLoading, setIsLoading] = React.useState(true);
	const [jobOpp, setJobOpp] = React.useState(state.jobOpp);
	const [showRegisterPost, setShowRegisterPost] = React.useState(false);
	const [showConfirm, setShowConfirm] = React.useState(false);

	React.useEffect(() => {
		setJobOpp(state.jobOpp);
		setIsLoading(false);
	}, [])

	const handleSubmit = () => {
		setShowRegisterPost(true)
	}

	const handleCloseModalNotify = () => {
		setShowRegisterPost(false)
	}

	const handlePostulate = () => {
		const obj = {
            oferta: jobOpp.job_offer__id,
			empleado: 1,
			acepta: 1
        }
        axiosEmployeeGaps
            .post("gaps/acceptOrDeclineJobOfferPreRegistered", obj)
            .then(function (response) {
                setShowConfirm(true);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            })
	}

	const handleCloseConfirm = () => {
        setShowConfirm(false);
		navigate(-1);
    }

	return (
		<>
			<div className='row'>
				<div className="col">
					<h2 className="screenTitle">Detalle de la oferta laboral</h2>
					<p className="text-muted">
						Descripción de la oferta, requisitos para el puesto y beneficios otorgados para el contratado.
					</p>
				</div>
				{isLoading ? <LoadingScreen /> :
				<div>
					<div className="row mt-3">
						<div className="col-12">
							<div className="card-job px-3 py-2">
								<div className="row">
									<div className="col-6">
										<div className='job-title'>{jobOpp.job_offer__offer_introduction}</div>
										{/* <div className='job-area'>Área de desarrollo de software</div> */}
									</div>
									<div className="col-6 d-flex justify-content-end align-items-center">
										<button type="button" className="btn btn-primary mx-2" onClick={() => handleSubmit()}>
											Aceptar postulación
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row mt-3 mx-0">
						<div className="col-6 card-job">
							<div className="row-7 mt-2">
								<h3 className="px-1">Descripcion del puesto</h3>
								<div className="px-3 job-text">{jobOpp.job_offer__introduction ? jobOpp.job_offer__introduction : 'Descripción no disponible'}</div>
							</div>
							<div className="row-7 mt-2">
								<h3 className="px-1">Responsabilidades</h3>
								<div className="px-3 job-text">
									{jobOpp.job_offer__responsabilities_introduction}
								</div>
							</div>
							<div className="row-7 mt-2">
								<h3 className="px-1">Requisitos</h3>
								<div className="px-3 job-text pb-2">
									{jobOpp.job_offer__location}
								</div>
							</div>
						</div>
						<div className="col-6">
							<div className="row-7 mb-2 card-job py-2">
								<h3 className="px-3">Beneficios</h3>
								<div className='px-4 job-text'>
									{jobOpp.job_offer__salary_range}
								</div>
							</div>
							<div className="row-5 mt-2 card-job py-2">
								<h3 className="px-3">Recomendaciones</h3>
								<div className="px-4 job-text">{jobOpp.recommendation}</div>
							</div>
						</div>
					</div>
				</div>}			
			</div>
			{!isLoading &&
			<div className="d-flex justify-content-start">
				<button className='btn btn-outline-primary my-2' onClick={() => navigate(-1)}>
					Regresar
				</button>
			</div>
			}
			<Modal show={showRegisterPost} onHide={handleCloseModalNotify}>
				<Modal.Header closeButton>
					<Modal.Title>Mensaje de confirmación</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>¿Seguro que desea postular al puesto de {jobOpp?.job_offer__offer_introduction}?</p>
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
						<p>Aceptó la postulación al puesto de {jobOpp?.job_offer__offer_introduction} con éxito</p>
						<div className='espacio'>
							<Button variant="primary" onClick={handleCloseConfirm}>
								Aceptar
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default JobOpportunitySelected;