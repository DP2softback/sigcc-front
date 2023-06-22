import React from 'react'
import { ArrowLeftCircleFill } from 'react-bootstrap-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';


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
        navigate("/selection-offers-and-positions/job-offers/register");
    }



    return (
        <div className='container'>
            <div className='row'>
            <div
				style={{
					display: "flex",
					alignItems: "center",
					paddingLeft: "10px"
				}}>

				<div className="col">
					<h1 className="screenTitle">{"Detalle de la oferta laboral"}</h1>
					<p>
						<small className="subtitle">
							Descripción de la oferta, requisitos para el puesto y beneficios
							otorgados para el contratado.
						</small>
					</p>
				</div>
			</div>
            
			<div>
				<div className="row mt-3">
					<div className="col-12">
						<div className="card px-2">
							<div className="row">
								<div className="col-6">
									<h1>{jobOpp.introduction}</h1>
									<div>Área de desarrollo de software</div>
								</div>
								<div className="col-6 d-flex justify-content-end align-items-center">
									<button type="button" className="btn btn-primary mx-2" onClick={()=>handleSubmit()}>
										Aceptar postulación
									</button>
                                    <button type="button" className="btn btn-primary" onClick={()=>handleSubmit()}>
										Declinar postulación
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col-6">
						<div className="row-7 mt-2">
							<div className="card">
								<h3 className="px-1">Descripcion del puesto</h3>
								<div className="px-3">{jobOpp.job_description}</div>
							</div>
						</div>
						<div className="row-7 mt-2">
							<div className="card">
								<h3 className="px-1">Responsabilidades</h3>
								<div className="px-3">
									{jobOpp.responsibilities
										.split("\n")
										.map((element, index) => (
											<div key={index}>{element}</div>
										))}
								</div>
							</div>
						</div>
						<div className="row-7 mt-2">
							<div className="card">
								<h3 className="px-1">Requisitos</h3>
								<div className="px-3">
									{jobOpp.requirements.split("\n").map((element, index) => (
										<div key={index}>{element}</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="row-5 mt-2">
							<div className="card">
								<h3 className="px-1">Beneficios</h3>
								<div className="px-3">{jobOpp.benefits}</div>
							</div>
						</div>
						<div className="row-5 mt-2">
							<div className="card">
								<h3 className="px-1">Resumen</h3>
								<div className="px-3">{jobOpp.summary}</div>
							</div>
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
        </div>
    )
}

export default JobOpportunitySelected;