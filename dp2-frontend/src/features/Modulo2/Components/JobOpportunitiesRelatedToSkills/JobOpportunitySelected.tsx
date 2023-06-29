import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './JobOpportunitySelected.css';

const JobOpportunitySelected = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [jobOpp, setJobOpp] = React.useState(state.jobOpp);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        setJobOpp(state.jobOpp);
    }, [])

    const handleSubmit = () => {
        setShowModal(false)
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
			<div>
				<div className="row mt-3">
					<div className="col-12">
						<div className="card-job px-3 py-2">
							<div className="row">
								<div className="col-6">
									<div className='job-title'>{jobOpp.introduction}</div>
									<div className='job-area'>Área de desarrollo de software</div>
								</div>
								<div className="col-6 d-flex justify-content-end align-items-center">
									<button type="button" className="btn btn-primary mx-2" onClick={()=>handleSubmit()}>
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
							<div className="px-3 job-text">{jobOpp.responsabilities_introduction ? jobOpp.responsabilities_introduction : 'Descripción no disponible'}</div>
						</div>
						<div className="row-7 mt-2">
							<h3 className="px-1">Responsabilidades</h3>
							<div className="px-3 job-text">
								{jobOpp.responsibilities
									.split("\n")
									.map((element, index) => (
										<div key={index}>{element}</div>
									))}
							</div>
						</div>
						<div className="row-7 mt-2">
							<h3 className="px-1">Requisitos</h3>
							<div className="px-3 job-text">
								{jobOpp.requirements.split("\n").map((element, index) => (
									<div key={index}>{element}</div>
								))}
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="row-7 mb-2 card-job py-2">
							<h3 className="px-3">Beneficios</h3>
							<div className='px-4 job-text'>
							{jobOpp.benefits.split("\n").map((element, index) => (
									<div key={index}>{element}</div>
								))}
							</div>
						</div>
						<div className="row-5 mt-2 card-job py-2	">
							<h3 className="px-3">Resumen</h3>
							<div className="px-4 job-text">{jobOpp.summary}</div>
						</div>
					</div>
				</div>
			</div>
            </div>
            <div className="d-flex justify-content-start">
            <button className='btn btn-outline-primary my-2' onClick={() => navigate(-1)}>
                Regresar
            </button>
            </div>
        </>
    )
}

export default JobOpportunitySelected;