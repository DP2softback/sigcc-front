import { Link, useNavigate } from 'react-router-dom';
import './learning-path.css';
import '../../content/common.css';
import axiosInt from '@config/axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import Sidebar from '@components/Sidebar';
import sidebarItems from '../../utils/sidebarItems';
import PictureUpload from '@features/Modulo1/components/PictureUpload';
import Rate from '@features/Modulo1/components/Rate';


function LearningPath (props: any)
{
    const [lps, setLps] = useState([]);
    const [lpsFiltered, setLpsFiltered] = useState([]);
    const [assessmentSettings, setAssessmentSettings] = useState(true);
    const [assessmentParameters, setAssessmentParameters] = useState({
        courseTriedNumber: 3,
        minimumPassingScore: 11,
        courseTriedNumberFE: 3,
        minimumPassingScoreFE: 11,
    });
    const [assessmentTempParameters, setAssessmentTempParameters] = useState({
        courseTriedNumber: 3,
        minimumPassingScore: 11,
        courseTriedNumberFE: 3,
        minimumPassingScoreFE: 11,
    });
    const [assessmentTuning, setAssessmentTuning] = useState(false);
    const navigate = useNavigate();

    const refLpName = useRef<HTMLInputElement>(null);
    const refLpDescription = useRef<HTMLTextAreaElement>(null);

    const courseTriedNumberRef = useRef(null);
    const minimumPassingScoreRef = useRef(null);
    const courseTriedNumberFERef = useRef(null);
    const minimumPassingScoreFERef = useRef(null);

    const createLP = () =>
    {
        const data = {
            nombre: refLpName.current?.value,
            descripcion: refLpDescription.current?.value,
        }

        axiosInt.post('capacitaciones/learning_path/', data)
            .then(function (response)
            {
                navigate(`/modulo1/rutadeaprendizaje/detalle/${response.data.id}`);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }
    const loadLPs = () =>
    {
        axiosInt.get('capacitaciones/learning_path/')
            .then(function (response)
            {
                setLps(response.data);
                setLpsFiltered(response.data);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    useEffect(() =>
    {
        loadLPs();
    }, []);

    const handleFilter = (e: any) =>
    {
        const searchTerm = e.target.value;
        const filtered = lps.filter((item: any) =>
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setLpsFiltered(filtered);
    };


    const handleCourseType = (e: any) =>
    {
        const type = e.target.id;
        type === 'udemyRadio' ? setAssessmentSettings(true) : setAssessmentSettings(false);
    };

    const handleAssesmentTuning = () =>
    {
        setAssessmentTuning(!assessmentTuning);
    }

    const handleAssesmentSaveSettings = () =>
    {
        setAssessmentParameters(assessmentTempParameters);
        setAssessmentTuning(!assessmentTuning);
    }

    const handleAssesmentParameters = () =>
    {
        setAssessmentTempParameters({
            courseTriedNumber: courseTriedNumberRef.current.value,
            minimumPassingScore: minimumPassingScoreRef.current.value,
            courseTriedNumberFE: courseTriedNumberFERef.current.value,
            minimumPassingScoreFE: minimumPassingScoreFERef.current.value,
        })
    }


    return (
        <>
            <Sidebar items={sidebarItems} active='/modulo1/rutadeaprendizaje'>
                <div className='row'>
                    <div className='col'>
                        <h1>Rutas de aprendizaje</h1>
                        <p><small className='opacity-50'>Lista de rutas de aprendizaje creadas que los empleados pueden completar para adquirir habilidades y competencias específicas.</small></p>
                    </div>
                    <div style={{ flex: '0 0 15rem' }} className="col text-end">
                        <button type="button" className="btn btn-primary" data-bs-target="#createLPModalChoose" data-bs-toggle="modal">
                            <span className='me-3'>Crear ruta</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input className="form-control" type="text" placeholder="Buscar" onChange={handleFilter} />
                    </div>
                </div>
                <div className='container'>
                    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-stretch g-3 py-3'>
                        {
                            lpsFiltered.map((lp: {
                                id: number,
                                nombre: string,
                                descripcion: string
                            }, i: number) =>
                            {
                                return <Fragment key={i}>
                                    <div className='col'>
                                        <div className="card">
                                            <img src={'https://i.pcmag.com/imagery/reviews/05LfIOxtkYAZ4BIOXwOnZJs-24.fit_scale.size_760x427.v1626447626.png'} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h6 className="card-title">{lp.nombre}</h6>
                                                <p className="card-text text-truncate line-clamp-3 opacity-50"><small>{lp.descripcion}</small></p>
                                                <div className='d-flex justify-content-between'>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event me-3" viewBox="0 0 16 16">
                                                            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                                        </svg>
                                                        <small>10/04/2023</small>
                                                    </div>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people me-3" viewBox="0 0 16 16">
                                                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                                                        </svg>
                                                        <small>23</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="d-flex gap-2 w-100 justify-content-between">
                                                    <span>
                                                        <Rate />
                                                    </span>
                                                    <Link to={`/modulo1/rutadeaprendizaje/detalle/${lp.id}`} className="btn btn-primary float-right">Detalles</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            })
                        }
                    </div>
                    {
                        lpsFiltered.length === 0 && <>
                            <div className='row align-items-stretch g-3 py-3'>
                                <div className='col'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                <div className='vertical-align-child'>
                                                    <h5 className='opacity-50 text-center'>Crea una ruta de aprendizaje para empezar</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </Sidebar>
            <div className="modal fade" id="createLPModalChoose" aria-hidden="true" aria-labelledby="createLPModalChoose" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Seleccione una opción</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button className="btn btn-primary" data-bs-target="#createLPModal" data-bs-toggle="modal">Nueva ruta</button>
                            <button className="btn btn-primary" data-bs-target="#createLPModalChoose" data-bs-toggle="modal">Utilizar una plantilla</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="createLPModal" aria-hidden="true" aria-labelledby="createLPModal" tabIndex={-1}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Crear ruta de aprendizaje</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col' style={{ flex: '0 0 8rem' }}>
                                    <PictureUpload />
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input ref={refLpName} type="text" className="form-control" />
                                    </div>
                                    <div>
                                        <label className="form-label">Descripción</label>
                                        <textarea ref={refLpDescription} className="form-control" />
                                    </div>
                                </div>
                            </div>
                            {
                                assessmentTuning ? <>
                                    <div className='row border-top pt-3 mt-3'>
                                        <div className='col'>
                                            <h6>Evaluaciones</h6>
                                            <div className="row mb-3">
                                                <label htmlFor="courseTriedNumber" className="col-sm-8 col-form-label">Número de intentos</label>
                                                <div className="col-sm-4">
                                                    <input ref={courseTriedNumberRef} type="number" className="form-control" id="courseTriedNumber" defaultValue={assessmentParameters.courseTriedNumber} onChange={handleAssesmentParameters} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label htmlFor="minimumPassingScore" className="col-sm-8 col-form-label">Nota mínima aprobatoria</label>
                                                <div className="col-sm-4">
                                                    <input ref={minimumPassingScoreRef} type="number" className="form-control" id="minimumPassingScore" defaultValue={assessmentParameters.minimumPassingScore} onChange={handleAssesmentParameters} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <h6>Evaluación final</h6>
                                            <div className="row mb-3">
                                                <label htmlFor="courseTriedNumberFE" className="col-sm-8 col-form-label">Número de intentos</label>
                                                <div className="col-sm-4">
                                                    <input ref={courseTriedNumberFERef} type="number" className="form-control" id="courseTriedNumberFE" defaultValue={assessmentParameters.courseTriedNumberFE} onChange={handleAssesmentParameters} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label htmlFor="minimumPassingScoreFE" className="col-sm-8 col-form-label">Nota mínima aprobatoria</label>
                                                <div className="col-sm-4">
                                                    <input ref={minimumPassingScoreFERef} type="number" className="form-control" id="minimumPassingScoreFE" defaultValue={assessmentParameters.minimumPassingScoreFE} onChange={handleAssesmentParameters} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </> : <>
                                    <div className='row border-top pt-3 mt-3'>
                                        <div className='col'>
                                            <h6>Tipo</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="courseConfig" id="trainingRadio" onClick={handleCourseType} />
                                                <label className="form-check-label" htmlFor="trainingRadio">
                                                    Capacitaciones
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="courseConfig" id="udemyRadio" defaultChecked onClick={handleCourseType} />
                                                <label className="form-check-label" htmlFor="udemyRadio">
                                                    Cursos de Udemy
                                                </label>
                                            </div>
                                        </div>
                                        {
                                            assessmentSettings ? <>
                                                <div className='col opacity-50'>
                                                    <h6>Parámetros de evaluación</h6>
                                                    <div>
                                                        <p className='mb-0'>Número de intentos: <span className='fw-bold'>{assessmentParameters.courseTriedNumber} EP</span> - <span className='fw-bold'>{assessmentParameters.courseTriedNumberFE} EF</span></p>
                                                    </div>
                                                    <div>
                                                        <p className='mb-0'>Nota mínima aprobatoria: <span className='fw-bold'>{assessmentParameters.minimumPassingScore} EP</span> - <span className='fw-bold'>{assessmentParameters.minimumPassingScoreFE} EF</span></p>
                                                    </div>
                                                </div>
                                            </> : <></>
                                        }
                                    </div>
                                </>
                            }
                        </div>
                        {
                            assessmentTuning ? <>
                                <div className="modal-footer d-flex justify-content-between">
                                    <button className="btn btn-primary" onClick={handleAssesmentTuning} >Cancelar</button>
                                    <button className="btn btn-primary" onClick={handleAssesmentSaveSettings}>Guardar</button>
                                </div>
                            </> :
                                <>
                                    <div className="modal-footer d-flex justify-content-between">
                                        <button className="btn btn-primary" onClick={handleAssesmentTuning} >Configurar</button>
                                        <button className="btn btn-primary" data-bs-target="#createLPModal" data-bs-toggle="modal" onClick={createLP}>Crear</button>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default LearningPath;
