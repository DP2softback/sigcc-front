import { Link, useNavigate } from 'react-router-dom';
import './learning-path.css';
import '../../content/common.css';
import axiosInt from '@config/axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import Sidebar from '@components/Sidebar';
import sidebarItems from '../../utils/sidebarItems';
import PictureUpload from '@features/Modulo1/components/PictureUpload';
import Rate from '@features/Modulo1/components/Rate';
import { ThreeDotsVertical, People, Clock } from 'react-bootstrap-icons'
import Layout from "@layout/default/index";


function LearningPath (props: any)
{
    const [lps, setLps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lpsFiltered, setLpsFiltered] = useState([]);
    const [assessmentParameters, setAssessmentParameters] = useState({
        courseTriedNumber: 3,
        courseTriedNumberFE: 3,
    });
    const [assessmentTempParameters, setAssessmentTempParameters] = useState({
        courseTriedNumber: 3,
        courseTriedNumberFE: 3,
    });
    const navigate = useNavigate();

    const refLpName = useRef<HTMLInputElement>(null);
    const refLpDescription = useRef<HTMLTextAreaElement>(null);

    const courseTriedNumberRef = useRef(null);
    const minimumPassingScoreRef = useRef(null);
    const courseTriedNumberFERef = useRef(null);
    const minimumPassingScoreFERef = useRef(null);
    const photoRef = useRef(null);

    const createLP = () =>
    {
        const data = {
            nombre: refLpName.current?.value,
            descripcion: refLpDescription.current?.value,
            url_foto: photoRef.current.getUrl(),
            cant_intentos_cursos_max: courseTriedNumberRef.current.value,
            cant_intentos_evaluacion_integral_max: courseTriedNumberFERef.current.value,
        }

        axiosInt.post('capacitaciones/learning_path/', data)
            .then(function (response)
            {
                navigate(`/modulo1/rutadeaprendizaje/detalle/${response.data.id}`);
            })
            .catch(function (error)
            {
            });
    }
    const loadLPs = () =>
    {
        setLoading(true);
        axiosInt.get('capacitaciones/learning_path/')
            .then(function (response)
            {
                setLps(response.data);
                setLpsFiltered(response.data);
                setLoading(false);
            })
            .catch(function (error)
            {
                setLoading(false);
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

    const handleAssesmentSaveSettings = () =>
    {
        setAssessmentParameters(assessmentTempParameters);
    }

    const handleAssesmentParameters = () =>
    {
        setAssessmentTempParameters({
            courseTriedNumber: courseTriedNumberRef.current.value,
            courseTriedNumberFE: courseTriedNumberFERef.current.value,
        })
    }


    return (
        <>
            {/* <Layout title="Grupo 1 App" content="container"> */}
            {/* <Sidebar items={sidebarItems} active='/modulo1/rutadeaprendizaje'> */}
                {
                    loading ?
                        <>
                            <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)' }}>
                                <div className='vertical-align-child'>
                                    <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </> :
                        <>
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
                            <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 align-items-stretch g-3 py-3'>
                                {
                                    lpsFiltered.map((lp: {
                                        id: number,
                                        nombre: string,
                                        descripcion: string,
                                        url_foto: string,
                                        suma_valoraciones: number,
                                        cant_empleados: number,
                                        horas_duracion: number,
                                    }, i: number) =>
                                    {
                                        return <Fragment key={i}>
                                            <div className='col'>
                                                <div className="card h-100">
                                                    <img src={lp.url_foto} className="card-img-top lp-card-img" alt="Card" />
                                                    <div className="card-body">
                                                        <div className="lp-header justify-content-between d-flex">
                                                            <div className="align-self-center">
                                                                <h6 className="card-title">{lp.nombre}</h6>
                                                            </div>
                                                            <button className='btn btn-link'>
                                                                <ThreeDotsVertical />
                                                            </button>
                                                        </div>
                                                        <p className='mb-0'><small className="opacity-50">{lp.descripcion}</small></p>
                                                    </div>
                                                    <div className="card-footer pb-3 lp-footer">
                                                        <div className='d-flex mb-3'>
                                                            <Clock className='align-self-center me-3' />
                                                            <div className='w-100 d-flex justify-content-between'>
                                                                <span>Duración: </span>
                                                                <small className='fw-bold'>{lp.horas_duracion}</small>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex'>
                                                            <People className='align-self-center me-3' />
                                                            <div className='w-100 d-flex justify-content-between'>
                                                                <span>Inscritos: </span>
                                                                <small className='fw-bold'>{lp.cant_empleados}</small>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex gap-2 w-100 justify-content-between pt-3">
                                                            <span>
                                                                <Rate disabled={true} rate={lp.suma_valoraciones} />
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
                        </>
                }
            {/* </Sidebar> */}
            {/* </Layout> */}
            
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
                                    <PictureUpload ref={photoRef} />
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
                            <div className='row border-top pt-3 mt-3'>
                                <div className='col'>
                                    <h6>Evaluaciones</h6>
                                    <div className="row">
                                        <label htmlFor="courseTriedNumber" className="col-sm-8 col-form-label">Número de intentos</label>
                                        <div className="col-sm-4">
                                            <input ref={courseTriedNumberRef} type="number" className="form-control" id="courseTriedNumber" defaultValue={assessmentParameters.courseTriedNumber} onChange={handleAssesmentParameters} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <h6>Evaluación final</h6>
                                    <div className="row">
                                        <label htmlFor="courseTriedNumberFE" className="col-sm-8 col-form-label">Número de intentos</label>
                                        <div className="col-sm-4">
                                            <input ref={courseTriedNumberFERef} type="number" className="form-control" id="courseTriedNumberFE" defaultValue={assessmentParameters.courseTriedNumberFE} onChange={handleAssesmentParameters} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <span></span>
                            <button className="btn btn-primary" data-bs-target="#createLPModal" data-bs-toggle="modal" onClick={createLP}>Crear ruta de aprendizaje</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LearningPath;
