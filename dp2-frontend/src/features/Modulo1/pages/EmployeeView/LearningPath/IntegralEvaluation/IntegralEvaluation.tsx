import axiosInt from '@config/axios';
import { useEffect, useRef, useState } from 'react'
import { ArrowLeftCircleFill, Check, Download, FileEarmarkZip, Pencil } from 'react-bootstrap-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../../../content/common.css';
import './integral-evaluation.css'
import lpdata from './IntegralEvaluation.json'
import FileZipUpload from '@features/Modulo1/components/FileZipUpload';
import { Spinner } from 'react-bootstrap';
import RateValue from '@features/Modulo1/components/Rate/RateValue';
import RubricGrade from '@features/Modulo1/components/Rubric/RubricGrade';

const DATA = lpdata

const DATAVACIA = {
    nombre: "",
    descripcion: "",
    url_foto: "",
    cursos: [],
    descripcion_evaluacion: null,
    archivo_eval: null,
    archivo_emp: null,
    rubrica: null
}

const dataEvaluation: EvaluationObj = {
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin eget dui nec vulputate. Cras pharetra varius viverra. Quisque nec maximus libero. In quis mollis erat. Aenean ac dapibus diam, id feugiat leo. Ut tristique lobortis erat, non consequat ligula mattis eget. Sed ac fermentum urna. Donec nec mi vehicula, aliquam tortor a, fermentum eros. Ut ex tortor, tincidunt eu ligula vitae, sodales fringilla sem. Aliquam lacinia, eros et maximus porta, leo est ornare eros, et gravida sem lectus non elit. In congue magna eget nisi varius, sed varius mauris convallis. Pellentesque vel vulputate nunc, ac ultricies tellus. Cras ac dui est. In ut lorem euismod, auctor augue maximus, tristique lectus. Ut tempus pellentesque urna a lobortis. Phasellus tempus laoreet mollis. ",
}

let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'

type CourseObj = {
    id: number;
    nro_orden: number;
}

type LPObj = {
    nombre: string;
    descripcion: string;
    url_foto: string;
    descripcion_evaluacion: string;
    archivo_eval: string;
    archivo_emp: string;
    rubrica: any;
}

type EvaluationObj = {
    descripcion: string;
}

const IntegralEvaluation = () => {
    const { learningPathId } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [fileUploaded, setFileUploaded] = useState<boolean>(true);
    const [lpDetails, setLPDetails] = useState<LPObj>(DATAVACIA)
    const [lpCourses, setLPCourses] = useState<CourseObj[]>([])

    const [fileName, setFileName] = useState<string>("")
    const [fileURL, setFileURL] = useState<string>("")
    const [fileURLEval, setFileURLEval] = useState<string>("")

    const refLPFile = useRef(null);
    const refLPComment = useRef<HTMLTextAreaElement>(null);
    const refLPRate = useRef(null);

    const [lpState, setLPState] = useState<string>("")
    const [rubric, setRubric] = useState<any>([])
    const employeeID = 1
    const userID = 7
    
    const loadIntegralEval = () => {
        setLoading(true);
        
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/empleado/${employeeID}/evaluacion/`)
            .then(function (response) {
                console.log(response.data)
                setLPDetails(response.data.datos_learning_path)
                setLPCourses(response.data.cursos)
                setRubric(response.data.datos_learning_path.rubrica)
                console.log(response.data.datos_learning_path.estado[0].estado)
                setLPState(response.data.datos_learning_path.estado[0].estado)

                if(response.data.datos_learning_path.archivo_eval === null){
                    //setFileUploaded(false)
                }
                else{
                    setFileURLEval(response.data.datos_learning_path.archivo_eval.url_documento)
                }

                if(response.data.archivo_emp === null){
                    setFileUploaded(false)
                }
                else{
                    setFileURL(response.data.archivo_emp[0].url_documento)
                    const url = response.data.archivo_emp[0].url_documento
                    const parts_url = url.split("/");
                    setFileName(parts_url[4])
                }

                
/*
                axiosInt.get(`capacitaciones/learning_path/rubrica/${learningPathId}/empleado/${employeeID}/`)
                    .then(function (response) {
                        console.log(response.data.criterias[0].rubrica_calificada_evaluacion)
                        if(response.data.criterias[0].rubrica_calificada_evaluacion.length > 0){
                            console.log(response.data.criterias[0].rubrica_calificada_evaluacion);
                            setRubric(response.data.criterias[0].rubrica_calificada_evaluacion)
                        }

                        setLoading(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                        setLoading(false);
                    });
*/
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
        setFileUploaded(true)
        setFileName(refLPFile.current.state.fileName)
        setFileURL(refLPFile.current.state.fileURL)
        //setLoading(true)

        const data = {
            learning_path: parseInt(learningPathId),
            empleado: 1,    // CAMBIAR CON LOGIN
            archivo_emp: refLPFile.current.getUrl(),
        }

        console.log(data)

        const dataState = {
            learning_path_id: parseInt(learningPathId),
            empleado_id: 1,   // CAMBIAR CON LOGIN
            estado_nuevo: 3
        }

        axiosInt.post(`capacitaciones/learning_path/evaluacion/`, data)
            .then(function (response) {
                console.log(response.data)

                axiosInt.post(`capacitaciones/lp_employee_advance/`, dataState)
                .then((response) => {
                    console.log(response)
                    setLoading(false)
                })
                .catch(function (error) {
                    setLoading(false)
                });
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            })
    }

    const saveRate = () => {
        const data = {
            empleado: 1,    // CAMBIAR
            valoracion: refLPRate.current?.refValueSelected,
            comentario: refLPComment.current?.value
        }
        console.log(data)
        
        axiosInt.post(`capacitaciones/valorar_learning_path/${learningPathId}/`, data)
            .then(function (response) {
                console.log(response.data)
                navigate('/modulo1/empleado/rutadeaprendizaje')
            })
            .catch(function (error) {
                console.log(error);
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

                        {lpCourses.length > 0 ?
                            <>
                                <div className='row'>
                                    <div className='pt-5 pb-2' style={{ display: "flex", justifyContent: "space-evenly" }}>
                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                            {lpCourses.map((course: any, index: number) => (
                                                <div key={course.id}>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                    <div className="circulo-terminado"><Check /></div>
                                                        {(index + 1) !== lpCourses.length && <div className="linea" style={{ paddingLeft: "2rem" }}></div>}
                                                    </div>
                                                    <div>Curso {index + 1}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='pt-4 pb-2' style={{ display: "flex", justifyContent: "center" }}>
                                        <div className="card mb-3" style={{ width: "65.5rem" }}>
                                            <div className="row g-0" style={{ height: "100%" }}>
                                                <div className="card-body">
                                                    <h3 className="card-title">Evaluación Integral</h3>
                                                    <p className="card-text">{lpDetails.descripcion_evaluacion === null ? dataEvaluation.descripcion : lpDetails.descripcion_evaluacion}</p>
                                                    <div className='row mt-3'>
                                                        <div className='col'>
                                                            <button className='btn btn-outline-primary'><a href={fileURLEval}><Download/><span style={{marginLeft: "1rem"}}>Especificaciones de la evaluación</span></a></button>
                                                        </div>
                                                    </div>

                                                    <h5 className='card-title mt-3'>Rúbrica de evaluación:</h5>
                                                    <div className='row mt-3'>
                                                        <div className='col'>
                                                            <RubricGrade criterias={rubric} disabled={true}/>
                                                        </div>
                                                    </div>

                                                    {
                                                        fileUploaded === false ?
                                                            (<>
                                                                <h5 className="card-title mt-3">Adjuntar archivo</h5>
                                                                <FileZipUpload ref={refLPFile} />
                                                            </>)
                                                            :
                                                            (<>
                                                                <h5 className="card-title mt-3">Documento adjunto:</h5>
                                                                <div className='row mt-3'>
                                                                    <div className='col-10'>
                                                                        <button className='btn btn-outline-primary'><a href={fileURL} download={fileName}><FileEarmarkZip /><span style={{ marginLeft: "1rem" }}>{fileName}</span></a></button>
                                                                    </div>
                                                                    {
                                                                        lpState === "4" ? 
                                                                        (<></>)
                                                                        :
                                                                        (
                                                                            <div className='col-2 text-end'>
                                                                                <button className='btn btn-outline-secondary' onClick={() => setFileUploaded(false)}><Pencil /></button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </>)
                                                    }
                                                </div>
                                                {
                                                    lpState === "4" ?
                                                    (<></>)
                                                    :
                                                    (
                                                        <div className="card-footer d-grid gap-2 d-md-flex justify-content-md-end">
                                                            {
                                                                fileUploaded === false ?
                                                                    (<>
                                                                        <button className="btn btn-outline-primary me-md-2" type="button" data-bs-target='#cancelIntegralEval' data-bs-toggle='modal'>Cancelar</button>
                                                                        <button className="btn btn-primary" type="button" data-bs-target='#confirmIntegralEval' data-bs-toggle='modal'>Guardar</button>
                                                                    </>)
                                                                    :
                                                                    (
                                                                        <button className="btn btn-primary" type="button" data-bs-target='#rateLP' data-bs-toggle='modal'>Finalizar</button>
                                                                    )
                                                            }
                                                        </div>
                                                    )
                                                }
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
                                                <button className="btn btn-primary" data-bs-dismiss="modal" onClick={() => confirmIntegralEval()} disabled={loading}>Confirmar <Spinner hidden={!loading} style={{ marginLeft: '0.7rem' }} as="span" animation="border" size="sm" /></button>
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

                                {/* MODAL RATE LP */}
                                <div className="modal fade" id="rateLP" aria-hidden="true" aria-labelledby="rateLP" tabIndex={-1}>
                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="rateLP">Calificación de la ruta de aprendizaje</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="d-flex justify-content-between align-items-baseline">
                                                    <label className="form-label">Valoración</label>
                                                    <RateValue ref={refLPRate} />
                                                </div>
                                                <div>
                                                    <label className="form-label">Comentarios</label>
                                                    <textarea ref={refLPComment} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => navigate('/modulo1/empleado/rutadeaprendizaje')}>Omitir</button>
                                                <button className="btn btn-primary" data-bs-dismiss="modal" onClick={() => saveRate()}>Enviar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            (<></>)
                        }
                    </>
            }
        </>
    );
}

export default IntegralEvaluation