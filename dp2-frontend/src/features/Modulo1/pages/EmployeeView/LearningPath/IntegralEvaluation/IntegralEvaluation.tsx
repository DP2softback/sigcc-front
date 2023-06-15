import axiosInt from '@config/axios';
import { useEffect, useRef, useState } from 'react'
import { ArrowLeftCircleFill, Check, Download } from 'react-bootstrap-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../../../content/common.css';
import './integral-evaluation.css'
import lpdata from './IntegralEvaluation.json'
import FileZipUpload from '@features/Modulo1/components/FileZipUpload';
import { Spinner } from 'react-bootstrap';

const DATA = lpdata

const dataEvaluation: EvaluationObj = {
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin eget dui nec vulputate. Cras pharetra varius viverra. Quisque nec maximus libero. In quis mollis erat. Aenean ac dapibus diam, id feugiat leo. Ut tristique lobortis erat, non consequat ligula mattis eget. Sed ac fermentum urna. Donec nec mi vehicula, aliquam tortor a, fermentum eros. Ut ex tortor, tincidunt eu ligula vitae, sodales fringilla sem. Aliquam lacinia, eros et maximus porta, leo est ornare eros, et gravida sem lectus non elit. In congue magna eget nisi varius, sed varius mauris convallis. Pellentesque vel vulputate nunc, ac ultricies tellus. Cras ac dui est. In ut lorem euismod, auctor augue maximus, tristique lectus. Ut tempus pellentesque urna a lobortis. Phasellus tempus laoreet mollis. ",
    documento_base: "url1",
    documento_empleado: "url2",
}

let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'

type CourseObj = {
    id: number;
}

type LPObj = {
    nombre: string;
    descripcion: string;
    url_foto: string;
    cursos: CourseObj[];
}

type EvaluationObj = {
    descripcion: string;
    documento_base: string;
    documento_empleado: string;
}

const IntegralEvaluation = () => {
    const { learningPathId } = useParams();
    const [loading, setLoading] = useState(false);
    const [lpDetails, setLPDetails] = useState<LPObj>(DATA)
    const refTrFile = useRef(null);

    const loadIntegralEval = () => {
        setLoading(true);
        
        axiosInt.get(`algo/${learningPathId}/`)
            .then(function (response) {
                console.log(response.data)
                setLPDetails(response.data)
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }
    
    useEffect(() => {
        loadIntegralEval();
    }, []);

    const confirmIntegralEval = () => {
        setLoading(true)

        const data = {
            url_foto: refTrFile.current.getUrl(),
        }

        axiosInt.post(`algo`, data)
            .then(function (response) {
                console.log(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            })
    }

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };    
    
    return (
        <>
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
                    </>
                    :
                    <>
                        <div className='row'>
                            <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                                <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                    <Link to={`/modulo1/empleado/rutadeaprendizaje/detalle/${learningPathId}`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
                                </div>

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ paddingRight: "2rem" }}>
                                        {
                                            lpDetails.url_foto === null ?
                                                (<img src={url_foto_default} style={{ borderRadius: "100%", width: "6rem", height: "6rem" }}></img>)
                                                :
                                                (<img src={lpDetails.url_foto} style={{ borderRadius: "100%", width: "6rem", height: "6rem" }}></img>)
                                        }
                                    </div>
                                    <div>
                                        <h1 className='screenTitle'>{lpDetails.nombre}</h1>
                                        <p><small className='subtitle'>{lpDetails.descripcion}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {lpDetails.cursos.length > 0 ?
                            <>
                                <div className='row'>
                                    <div className='pt-5 pb-2' style={{ display: "flex", justifyContent: "space-evenly" }}>
                                        <div style={{ display: "flex" }}>
                                            {lpDetails.cursos.map((course: any) => (
                                                <div key={course.id}>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <div className="circulo-terminado"><Check /></div>
                                                        {(course.nro_orden) !== lpDetails.cursos.length && <div className="linea" style={{ paddingLeft: "2rem" }}></div>}
                                                    </div>
                                                    <div>Curso {course.nro_orden}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='pt-4 pb-2' style={{ display: "flex", justifyContent: "center" }}>
                                        <div className="card mb-3" style={{ width: "60rem" }}>
                                            <div className="row g-0" style={{ height: "100%" }}>
                                                <div className="card-body">
                                                    <h3 className="card-title">Evaluación Integral</h3>
                                                    <p className="card-text">{dataEvaluation.descripcion}</p>
                                                    <div className='row mt-3'>
                                                        <div className='col'>
                                                            <button className='btn btn-outline-primary'><Download/><span style={{marginLeft: "1rem"}}>Especificaciones de la evaluación</span></button>
                                                        </div>
                                                    </div>
                                                    <h6 className="card-title mt-3">Adjuntar archivo</h6>
                                                    <FileZipUpload ref={refTrFile}/>
                                                </div>
                                                <div className="card-footer d-grid gap-2 d-md-flex justify-content-md-end">
                                                    <button className="btn btn-outline-primary me-md-2" type="button" data-bs-target='#cancelIntegralEval' data-bs-toggle='modal'>Cancelar</button>
                                                    <button className="btn btn-primary" type="button" data-bs-target='#confirmIntegralEval' data-bs-toggle='modal'>Enviar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* MODAL SAVE */}
                                <div className="modal fade" id="confirmIntegralEval" aria-hidden="true" aria-labelledby="confirmIntegralEval" tabIndex={-1}>
                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="confirmAttendance">¿Desea enviar el archivo de la evaluación integral?</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-primary" data-bs-dismiss="modal" onClick={() => confirmIntegralEval()} disabled={loading}>Confirmar <Spinner hidden={!loading} style={{ marginLeft: '0.7rem' }} as="span" animation="border" size="sm"/></button>
                                        </div>
                                    </div>
                                    </div>
                                </div>

                                {/* MODAL CANCEL */}
                                <div className="modal fade" id="cancelIntegralEval" aria-hidden="true" aria-labelledby="cancelIntegralEval" tabIndex={-1}>
                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="cancelIntegralEval">¿Desea cancelar el envió del archivo de la evaluación integral?</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-primary" data-bs-dismiss="modal" onClick={goBack}>Confirmar</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                            </>
                        }

                    </>
            }
        </>
    );
}

export default IntegralEvaluation