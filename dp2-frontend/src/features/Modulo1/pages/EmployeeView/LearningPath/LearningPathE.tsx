import { Link, useNavigate } from 'react-router-dom';
import './learning-path.css';
import '../../../content/common.css';
import axiosInt from '@config/axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import Sidebar from '@components/Sidebar';
import sidebarItems from '@features/Modulo1/utils/sidebarItemsE'
import PictureUpload from '@features/Modulo1/components/PictureUpload';
import Rate from '@features/Modulo1/components/Rate';
import { ThreeDotsVertical, People, Clock, CalendarDate } from 'react-bootstrap-icons'
import moment, { invalid } from 'moment-timezone';
import Layout from "@layout/default/index";
import '../../../basic.css';

function LearningPath(props: any) {
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

    const createLP = () => {
        const data = {
            nombre: refLpName.current?.value,
            descripcion: refLpDescription.current?.value,
            url_foto: photoRef.current.getUrl(),
            cant_intentos_cursos_max: courseTriedNumberRef.current.value,
            cant_intentos_evaluacion_integral_max: courseTriedNumberFERef.current.value,
        }

        axiosInt.post('capacitaciones/learning_path/', data)
            .then(function (response) {
                navigate(`/modulo1/rutadeaprendizaje/detalle/${response.data.id}`);
            })
            .catch(function (error) {
            });
    }
    const loadLPs = () => {
        setLoading(true);
        axiosInt.get('capacitaciones/learning_path/empleado/1/')
            .then(function (response) {
                console.log(response.data)
                setLps(response.data);
                setLpsFiltered(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadLPs();
    }, []);

    const handleFilter = (e: any) => {
        const searchTerm = e.target.value;
        const filtered = lps.filter((item: any) =>
            item.learning_path.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setLpsFiltered(filtered);
    };

    const handleAssesmentSaveSettings = () => {
        setAssessmentParameters(assessmentTempParameters);
    }

    const handleAssesmentParameters = () => {
        setAssessmentTempParameters({
            courseTriedNumber: courseTriedNumberRef.current.value,
            courseTriedNumberFE: courseTriedNumberFERef.current.value,
        })
    }


    return (
        <>
            <Layout title="Grupo 1 App" content="container">
            {/* <Sidebar items={sidebarItems} active='/modulo1/empleado/rutadeaprendizaje'> */}
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
                                    <h1 className='screenTitle'>Rutas de aprendizaje</h1>
                                    <p><small className='subtitle'>Lista de rutas de aprendizaje asignadas para adquirir habilidades y competencias específicas.</small></p>
                                </div>
                            </div>
                            <div className="row row-search">
                                <div className="col">
                                    <input className="form-control" type="text" placeholder="Buscar" onChange={handleFilter} />
                                </div>
                            </div>
                            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-stretch g-3 py-3'>
                                {
                                    lpsFiltered.map((lp: {                                        
                                        fecha_asignacion: string,
                                        fecha_limite: string,
                                        learning_path: {
                                            id: number,
                                            nombre: string,
                                            descripcion: string,
                                            url_foto: string,
                                            suma_valoraciones: number,
                                            horas_duracion: number,
                                        }

                                    }, i: number) => {
                                        return <Fragment key={i}>
                                            <div className='col'>
                                                <div className="card h-100">
                                                    <div className="card-header lp-header justify-content-between d-flex px-2">
                                                        <img className="rounded-circle border lp-thumb me-3" src={lp.learning_path.url_foto} alt="..." />
                                                        <div className="align-self-center">
                                                            <h6 className="card-title">{lp.learning_path.nombre}</h6>
                                                        </div>
                                                        <button className='btn btn-link'>
                                                            <ThreeDotsVertical />
                                                        </button>
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="card-text lp-description-wrap opacity-50"><small>{lp.learning_path.descripcion}</small></p>
                                                    </div>
                                                    <div className="card-footer lp-footer">
                                                        <div className='d-flex mb-3'>
                                                            <Clock className='align-self-center me-3' />
                                                            <div className='w-100 d-flex justify-content-between'>
                                                                <span>Duración: </span>
                                                                <small className='fw-bold'>{lp.learning_path.horas_duracion}</small>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex mb-3'>
                                                            <CalendarDate className='align-self-center me-3' />
                                                            <div className='w-100 d-flex justify-content-between'>
                                                                <span>Fecha asignación: </span>
                                                                <small className='fw-bold'>{(moment(lp.fecha_asignacion, "DD/MM/YYYY HH:mm:ss").format("DD-MM-YYYY")) }</small>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex mb-3'>
                                                            <CalendarDate className='align-self-center me-3' />
                                                            <div className='w-100 d-flex justify-content-between'>
                                                                <span>Fecha límite: </span>
                                                                <small className='fw-bold'>{(moment(lp.fecha_limite, "DD/MM/YYYY HH:mm:ss").format("DD-MM-YYYY")) }</small>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex gap-2 w-100 justify-content-between pt-3">
                                                            <span>
                                                                <Rate disabled={true} rate={lp.learning_path.suma_valoraciones} />
                                                            </span>
                                                            <Link to={`/modulo1/empleado/rutadeaprendizaje/detalle/${lp.learning_path.id}`} className="btn btn-primary float-right">Ir al curso</Link>
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
                                                            <h5 className='opacity-50 text-center'>No hay rutas de aprendizajes asignadas</h5>
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
            {/* </Sidebar>  */}
            </Layout>           
        </>
    );
}

export default LearningPath;
