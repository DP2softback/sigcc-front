import Sidebar from '@components/Sidebar';
import RubricQualification from '@features/Modulo1/components/Rubric/RubricGrade';
import sidebarItems from '@utils/sidebarItems';
import { type } from 'os';
import { useState } from 'react'
import { ArrowLeftCircleFill, Download } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const dataHard = {
    nombre: "Ruta de Aprendizaje 2.0",
    descripcion: "Ruta de Aprendizaje 2.0 es una prueba pa ver si se cae o no.",
    nombreEmpleado: "John Doe"
}

const dataEvaluation: EvaluationObj = {
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin eget dui nec vulputate. Cras pharetra varius viverra. Quisque nec maximus libero. In quis mollis erat. Aenean ac dapibus diam, id feugiat leo. Ut tristique lobortis erat, non consequat ligula mattis eget. Sed ac fermentum urna. Donec nec mi vehicula, aliquam tortor a, fermentum eros. Ut ex tortor, tincidunt eu ligula vitae, sodales fringilla sem. Aliquam lacinia, eros et maximus porta, leo est ornare eros, et gravida sem lectus non elit. In congue magna eget nisi varius, sed varius mauris convallis. Pellentesque vel vulputate nunc, ac ultricies tellus. Cras ac dui est. In ut lorem euismod, auctor augue maximus, tristique lectus. Ut tempus pellentesque urna a lobortis. Phasellus tempus laoreet mollis. ",
    documento_base: "url1",
    documento_empleado: "url2",
    rubrica: "rubricaangel"
}

type EvaluationObj = {
    descripcion: string;
    documento_base: string;
    documento_empleado: string;
    rubrica: any;
}

function EvaluationReview() {
    const [loading, setLoading] = useState<boolean>(false);
    const [lpName, setLPName] = useState<string>(dataHard.nombre)
    const [lpDescription, setLPDescription] = useState<string>(dataHard.descripcion)
    const [employeeName, setEmployeeName] = useState<string>(dataHard.nombreEmpleado)
    const [evaluationData, setEvaluationData] = useState<EvaluationObj>(dataEvaluation)

    const navigate = useNavigate();

    const goBack = () =>{
        navigate(-1);
    };
    
    return (
        <>
            {/*<Sidebar items={sidebarItems} active='/modulo1/cursoempresa'>*/}
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
                                        <p>{evaluationData.descripcion}</p>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col'>
                                        <button className='btn btn-outline-primary'><Download/><span style={{marginLeft: "1rem"}}>Especificaciones de la evaluación</span></button>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <h5>Documento adjunto:</h5>
                                    <div className='col'>
                                        <button className='btn btn-outline-primary'><Download/><span style={{marginLeft: "1rem"}}>EvaluacionIntegral.zip</span></button>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <h5>Rúbrica de evaluación:</h5>
                                    <div className='col'>
                                        <RubricQualification/>
                                    </div>
                                </div>
                            </div>
                            

                        </div>
                    </>
                    )
                }
            {/*</Sidebar>*/}
        </>
    );
}

export default EvaluationReview