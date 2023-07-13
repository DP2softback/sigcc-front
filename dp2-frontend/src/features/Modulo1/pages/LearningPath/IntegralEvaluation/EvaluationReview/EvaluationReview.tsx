import RubricGrade from '@features/Modulo1/components/Rubric/RubricGrade';
import { useEffect, useState } from 'react'
import { ArrowLeftCircleFill, Download } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInt from '@config/axios';

const dataHard = {
    nombre: "Ruta de Aprendizaje 2.0",
    descripcion: "Ruta de Aprendizaje 2.0 es una prueba pa ver si se cae o no.",
    nombreEmpleado: "Angel Oropeza",
    descripcion_eval: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin eget dui nec vulputate. Cras pharetra varius viverra. Quisque nec maximus libero. In quis mollis erat. Aenean ac dapibus diam, id feugiat leo. Ut tristique lobortis erat, non consequat ligula mattis eget. Sed ac fermentum urna. Donec nec mi vehicula, aliquam tortor a, fermentum eros. Ut ex tortor, tincidunt eu ligula vitae, sodales fringilla sem. Aliquam lacinia, eros et maximus porta, leo est ornare eros, et gravida sem lectus non elit. In congue magna eget nisi varius, sed varius mauris convallis. Pellentesque vel vulputate nunc, ac ultricies tellus. Cras ac dui est. In ut lorem euismod, auctor augue maximus, tristique lectus. Ut tempus pellentesque urna a lobortis. Phasellus tempus laoreet mollis. ",
}


function EvaluationReview() {
    const { learningPathId, employeeID } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [lpName, setLPName] = useState<string>("")
    const [lpDescription, setLPDescription] = useState<string>("")
    const [employeeName, setEmployeeName] = useState<string>("")
    const [evalDescription, setEvalDescription] = useState<string>("")
    const [fileNameEmp, setFileNameEmp] = useState<string>("")
    const [fileURLEmp, setFileURLEmp] = useState<string>("")
    const [fileURLEval, setFileURLEval] = useState<string>("")
    const [rubric, setRubric] = useState<any>([])

    const loadEvalReview = () => {
        setLoading(true);
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/empleado/${employeeID}/`)
            .then(function (response) {
                console.log(response.data)
                setEmployeeName(response.data.empleado)
                setEvalDescription(response.data.descripcion_evaluacion)
                setLPDescription(response.data.descripcion_lp)
                setLPName(response.data.nombre_lp)

                if(response.data.archivo_emp !== null){
                    setFileURLEmp(response.data.archivo_emp[0].url_documento)
                    const url = response.data.archivo_emp[0].url_documento
                    const parts_url = url.split("/");
                    setFileNameEmp(parts_url[4])
                }
                
                if(response.data.archivo_eval !== null){
                    setFileURLEval(response.data.archivo_eval.url_documento)
                }

                setRubric(response.data.rubrica_calificada)

                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        loadEvalReview();
    }, []);

    const navigate = useNavigate();

    const goBack = () =>{
        navigate(-1);
    };
    
    return (
        <>
            {
                loading ?
                (
                    <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)' }}>
                        <div className='vertical-align-child'>
                            <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                )
                :
                (<>
                    <div className='row'>
                        {/* EVALUATION DATA */}
                        <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                            <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                <ArrowLeftCircleFill className="float-right" style={{ height: "32px", width: "32px", color: "black" }} onClick={goBack}/>
                            </div>

                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div>
                                    <h1 className='screenTitle'>{lpName}</h1>
                                    <h2>Evaluación Integral</h2>
                                    <p><small className='subtitle'>{lpDescription}</small></p>
                                </div>
                            </div>
                        </div>

                        <div style={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
                            <div className='row mt-4'>
                                <div className='col'>
                                    <h3>Empleado a calificar: {employeeName}</h3>
                                </div>
                            </div>

                            <div className='row mt-4'>
                                <h5>Descripción de la evaluación integral</h5>
                                <div className='col'>
                                    <p>{evalDescription}</p>
                                </div>
                            </div>

                            <div className='row mt-3'>
                                <div className='col'>
                                    <button className='btn btn-outline-primary'><a href={fileURLEval} download={fileURLEval}><Download/><span style={{marginLeft: "1rem"}}>Especificaciones de la evaluación</span></a></button>
                                </div>
                            </div>

                            <div className='row mt-3'>
                                <h5>Documento adjunto:</h5>
                                <div className='col'>
                                    {
                                        fileNameEmp === "" ?
                                        <button className='btn btn-secundary disabled'>Sin documento</button>
                                        :
                                        <button className='btn btn-outline-primary'><a href={fileURLEmp} download={fileNameEmp}><Download/><span style={{marginLeft: "1rem"}}>{fileNameEmp}</span></a></button>
                                    }
                                </div>
                            </div>

                            <div className='row mt-3'>
                                <h5>Rúbrica de evaluación:</h5>
                                <div className='col'>
                                    <RubricGrade criterias={rubric}/>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                </>
                )
            }
        </>
    );
}

export default EvaluationReview